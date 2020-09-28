import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { SideNav, Frame, Page, Sidebar } from '@servicetitan/design-system';
import { SideNavLinkItem } from '@servicetitan/link-item';

import { Loader } from '@sandboxes/web-components';

import './app.css';

export const App: React.FC = () => (
    <React.StrictMode>
        <HashRouter>
            <Frame>
                <Page
                    sidebar={
                        <Sidebar>
                            <Sidebar.Section padding="y">
                                <SideNav title="Application">
                                    <SideNavLinkItem pathname="/" exact>
                                        Main page
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/feature">Feature</SideNavLinkItem>
                                </SideNav>
                            </Sidebar.Section>
                        </Sidebar>
                    }
                    maxWidth="wide"
                >
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route
                                path="/"
                                exact
                                component={() => <React.Fragment>Main page</React.Fragment>}
                            />

                            <Route
                                path="/feature"
                                component={() => (
                                    <Loader
                                        packageUrl="https://unpkg.com/@sandboxes/feature-component@1.8.1"
                                        name="st-feature"
                                    />
                                )}
                            />
                        </Switch>
                    </React.Suspense>
                </Page>
            </Frame>
        </HashRouter>
    </React.StrictMode>
);
