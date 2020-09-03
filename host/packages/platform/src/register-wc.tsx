import React from 'react';
import ReactDOM from 'react-dom';

import retargetEvents from 'react-shadow-dom-retarget-events';

export function registerWC(name: string, Component: React.ComponentType) {
    const currentDir = (document.currentScript as HTMLScriptElement).src
        .split('/')
        .slice(0, -1)
        .join('/');

    class WebComponent extends HTMLElement {
        mountPoint = document.createElement('div');

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.innerHTML = `<link href="${currentDir}/index.css" rel="stylesheet">`;
            shadowRoot.appendChild(this.mountPoint);

            ReactDOM.render(<Component />, this.mountPoint);

            retargetEvents(shadowRoot);
        }

        disconnectedCallback() {
            ReactDOM.unmountComponentAtNode(this.mountPoint);
        }
    }

    customElements.define(name, WebComponent);
}
