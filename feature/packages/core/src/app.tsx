import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SideNav, Frame, Page, Sidebar } from '@servicetitan/design-system';
import { SideNavLinkItem } from '@servicetitan/link-item';

import './app.css';

import { MainPage } from './main-page';

export const App: React.FC = () => (
    <React.StrictMode>
        <BrowserRouter>
            <Frame>
                <Page
                    sidebar={
                        <Sidebar>
                            <Sidebar.Section padding="y">
                                <SideNav title="Application">
                                    <SideNavLinkItem pathname="/" exact>
                                        Feature main page
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/second-page">
                                        Feature second page
                                    </SideNavLinkItem>
                                </SideNav>
                            </Sidebar.Section>
                        </Sidebar>
                    }
                    maxWidth="wide"
                >
                    <Switch>
                        <Route path="/" exact component={MainPage} />
                        <Route
                            path="/second-page"
                            component={() => <React.Fragment>Feature second page</React.Fragment>}
                        />
                    </Switch>
                </Page>
            </Frame>
        </BrowserRouter>
    </React.StrictMode>
);
