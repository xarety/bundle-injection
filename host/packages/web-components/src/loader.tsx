import React from 'react';

declare global {
    const DEPENDENCIES: Record<string, string>;
}

async function getBundleInfo(packageUrl: string) {
    const {
        dependencies: packageDependencies,
        cli: { 'web-component': WebComponent },
    } = await (await fetch(`${packageUrl}/package.json`)).json();

    const isCompatible = Object.entries(DEPENDENCIES).every(([dependency, version]) => {
        if (!packageDependencies[dependency]) {
            return true;
        }

        // TODO: use semver comparison
        return packageDependencies[dependency] === version;
    });

    return {
        url: `${packageUrl}/dist/bundle/${isCompatible ? 'light' : 'full'}/index.js`,
        WebComponent,
    };
}

export interface LoaderProps {
    packageUrl: string;
    name: string;
}

export const Loader: React.FC<LoaderProps> = ({ packageUrl }) => {
    const Loader = React.useMemo(
        () =>
            React.lazy(async () => {
                const { url, WebComponent } = await getBundleInfo(packageUrl);

                if (Array.from(document.scripts).every(({ src }) => src !== url)) {
                    await new Promise(resolve => {
                        const script = document.createElement('script');

                        script.onload = resolve;
                        script.async = true;
                        script.src = url;

                        document.body.append(script);
                    });
                }

                return { default: () => <WebComponent /> };
            }),
        [packageUrl]
    );

    return <Loader />;
};
