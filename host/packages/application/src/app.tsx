import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SideNav, Frame, Page, Sidebar } from '@servicetitan/design-system';
import { SideNavLinkItem } from '@servicetitan/link-item';

import './app.css';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'st-feature': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

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

                            <Route path="/second-page" component={() => <st-feature />} />
                        </Switch>
                    </Page>
                </Frame>
            </React.Suspense>
        </BrowserRouter>
    </React.StrictMode>
);
