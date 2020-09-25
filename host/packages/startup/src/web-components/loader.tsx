import React from 'react';

declare global {
    const DEPENDENCIES: Record<string, string>;
}

async function getBundleUrl(packageUrl: string) {
    const { dependencies: packageDependencies } = await (
        await fetch(`${packageUrl}/package.json`)
    ).json();

    const isCompatible = Object.entries(DEPENDENCIES).every(([dependency, version]) => {
        if (!packageDependencies[dependency]) {
            return true;
        }

        // TODO: use semver comparison
        return packageDependencies[dependency] === version;
    });

    return `${packageUrl}/dist/bundle/${isCompatible ? 'light' : 'full'}/index.js`;
}

export interface LoaderProps {
    packageUrl: string;
    name: string;
}

export const Loader: React.FC<LoaderProps> = ({ packageUrl, name: WebComponent }) => {
    const Loader = React.useMemo(
        () =>
            React.lazy(async () => {
                const bundleUrl = await getBundleUrl(packageUrl);

                if (Array.from(document.scripts).every(({ src }) => src !== bundleUrl)) {
                    await new Promise(resolve => {
                        const script = document.createElement('script');

                        script.onload = resolve;
                        script.async = true;
                        script.src = bundleUrl;

                        document.body.append(script);
                    });
                }

                return { default: () => <WebComponent /> };
            }),
        [packageUrl, WebComponent]
    );

    return <Loader />;
};
