import React from 'react';
import ReactDOM from 'react-dom';

import retargetEvents from 'react-shadow-dom-retarget-events';

export function registerWC(name: string, Component: React.ComponentType, useShadow = true) {
    const currentDir = (document.currentScript as HTMLScriptElement).src
        .split('/')
        .slice(0, -1)
        .join('/');

    class WebComponent extends HTMLElement {
        mountPoint = document.createElement('div');

        connectedCallback() {
            const root = useShadow ? this.attachShadow({ mode: 'open' }) : this;
            root.innerHTML = `<link href="${currentDir}/index.css" rel="stylesheet">`;
            root.appendChild(this.mountPoint);

            ReactDOM.render(<Component />, this.mountPoint);

            if (useShadow) {
                retargetEvents(root as ShadowRoot);
            }
        }

        disconnectedCallback() {
            ReactDOM.unmountComponentAtNode(this.mountPoint);
        }
    }

    customElements.define(name, WebComponent);
}
