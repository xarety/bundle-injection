import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { TabGroup, Text, Tab } from '@servicetitan/design-system';
import { TabLinkItem } from '@servicetitan/link-item';
import axios from 'axios';

import * as Styles from './app.module.css';

export const App: React.FC = () => {
    const handleClick = () => {
        console.log(axios.defaults);
    };

    return (
        <React.StrictMode>
            <HashRouter>
                <TabGroup>
                    <TabLinkItem pathname="/feature" exact>
                        First
                    </TabLinkItem>
                    <TabLinkItem pathname="/feature/second">Second</TabLinkItem>
                    <TabLinkItem pathname="/feature/third">Third</TabLinkItem>
                    <Tab onClick={handleClick}>debug</Tab>
                </TabGroup>
                <Switch>
                    <Route
                        path="/feature"
                        exact
                        component={() => (
                            <Text className={Styles.red}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla
                                pharetra diam sit amet nisl suscipit. Arcu ac tortor dignissim
                                convallis aenean et tortor at. Lorem mollis aliquam ut porttitor.
                                Aliquet bibendum enim facilisis gravida neque convallis a cras
                                semper. Nunc vel risus commodo viverra maecenas accumsan lacus vel.
                                Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum.
                                Cursus sit amet dictum sit amet justo donec enim diam. Fermentum et
                                sollicitudin ac orci phasellus egestas tellus. Vitae aliquet nec
                                ullamcorper sit amet. Nisi porta lorem mollis aliquam ut. Tristique
                                sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula.
                                Turpis massa tincidunt dui ut ornare.
                            </Text>
                        )}
                    />
                    <Route
                        path="/feature/second"
                        component={() => (
                            <Text className={Styles.green}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla
                                pharetra diam sit amet nisl suscipit. Arcu ac tortor dignissim
                                convallis aenean et tortor at. Lorem mollis aliquam ut porttitor.
                                Aliquet bibendum enim facilisis gravida neque convallis a cras
                                semper. Nunc vel risus commodo viverra maecenas accumsan lacus vel.
                                Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum.
                                Cursus sit amet dictum sit amet justo donec enim diam. Fermentum et
                                sollicitudin ac orci phasellus egestas tellus. Vitae aliquet nec
                                ullamcorper sit amet. Nisi porta lorem mollis aliquam ut. Tristique
                                sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula.
                                Turpis massa tincidunt dui ut ornare.
                            </Text>
                        )}
                    />
                    <Route
                        path="/feature/third"
                        component={() => (
                            <Text className={Styles.blue}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla
                                pharetra diam sit amet nisl suscipit. Arcu ac tortor dignissim
                                convallis aenean et tortor at. Lorem mollis aliquam ut porttitor.
                                Aliquet bibendum enim facilisis gravida neque convallis a cras
                                semper. Nunc vel risus commodo viverra maecenas accumsan lacus vel.
                                Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum.
                                Cursus sit amet dictum sit amet justo donec enim diam. Fermentum et
                                sollicitudin ac orci phasellus egestas tellus. Vitae aliquet nec
                                ullamcorper sit amet. Nisi porta lorem mollis aliquam ut. Tristique
                                sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula.
                                Turpis massa tincidunt dui ut ornare.
                            </Text>
                        )}
                    />
                </Switch>
            </HashRouter>
        </React.StrictMode>
    );
};
