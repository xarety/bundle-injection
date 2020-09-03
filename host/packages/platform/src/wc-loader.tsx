import React from 'react';

export interface WCLoaderProps {
    bundle: string;
    name: string;
}

export const WCLoader: React.FC<WCLoaderProps> = ({ bundle, name: WebComponent }) => {
    const Loader = React.useMemo(
        () =>
            React.lazy(async () => {
                if (Array.from(document.scripts).every(({ src }) => src !== bundle)) {
                    await new Promise(resolve => {
                        const script = document.createElement('script');

                        script.onload = resolve;
                        script.async = true;
                        script.src = bundle;

                        document.body.append(script);
                    });
                }

                return { default: () => <WebComponent /> };
            }),
        [bundle, WebComponent]
    );

    return <Loader />;
};
