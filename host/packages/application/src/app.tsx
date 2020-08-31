import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SideNav, Frame, Page, Sidebar } from '@servicetitan/design-system';
import { SideNavLinkItem } from '@servicetitan/link-item';

import { IWidget } from '@sandboxes/feature-abstractions';

const importShim = (window as any).importShim;

import './app.css';

const Widget = React.lazy<IWidget>(async () => {
    const result = await importShim('https://unpkg.com/@sandboxes/feature@0.0.7/dist/index.js');
    debugger;

    class Stub extends React.Component {
        render() {
            return 'Hey man!';
        }
    }

    return Promise.resolve({ default: Stub as any });
});

export const App: React.FC = () => (
    <React.StrictMode>
        <BrowserRouter>
            <React.Suspense fallback={<div>Loading...</div>}>
                <Frame>
                    <Page
                        sidebar={
                            <Sidebar>
                                <Sidebar.Section padding="y">
                                    <SideNav title="Application">
                                        <SideNavLinkItem pathname="/" exact>
                                            Main page
                                        </SideNavLinkItem>
                                        <SideNavLinkItem pathname="/second-page">
                                            Second page
                                        </SideNavLinkItem>
                                    </SideNav>
                                </Sidebar.Section>
                            </Sidebar>
                        }
                        maxWidth="wide"
                    >
                        <Switch>
                            <Route
                                path="/"
                                exact
                                component={() => <React.Fragment>Main page</React.Fragment>}
                            />
                            <Route
                                path="/second-page"
                                component={() => (
                                    <Widget
                                        title="Hello World!"
                                        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla pharetra diam sit amet nisl suscipit. Arcu ac tortor dignissim convallis aenean et tortor at. Lorem mollis aliquam ut porttitor. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Nunc vel risus commodo viverra maecenas accumsan lacus vel. Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Cursus sit amet dictum sit amet justo donec enim diam. Fermentum et sollicitudin ac orci phasellus egestas tellus. Vitae aliquet nec ullamcorper sit amet. Nisi porta lorem mollis aliquam ut. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Turpis massa tincidunt dui ut ornare."
                                    />
                                )}
                            />
                        </Switch>
                    </Page>
                </Frame>
            </React.Suspense>
        </BrowserRouter>
    </React.StrictMode>
);
