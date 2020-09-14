import React from 'react';
import ReactDOM from 'react-dom';

import retargetEvents from 'react-shadow-dom-retarget-events';

export function registerWC(name: string, Component: React.ComponentType, lightweight: boolean) {
    const currentDir = (document.currentScript as HTMLScriptElement).src
        .split('/')
        .slice(0, -1)
        .join('/');

    class WebComponent extends HTMLElement {
        mountPoint = document.createElement('div');

        connectedCallback() {
            const root = this.attachShadow({ mode: 'open' });
            root.innerHTML = `<link href="${currentDir}/index.css" rel="stylesheet">`;

            if (lightweight) {
                const designSystem = Array.from(document.styleSheets).find(
                    ({ href }) => href && /design-system.+\.bundle.css/.test(href)
                );

                if (designSystem) {
                    root.innerHTML += `<link href="${designSystem.href}" rel="stylesheet">`;
                }
            }

            root.appendChild(this.mountPoint);

            ReactDOM.render(<Component />, this.mountPoint);

            retargetEvents(root);
        }

        disconnectedCallback() {
            ReactDOM.unmountComponentAtNode(this.mountPoint);
        }
    }

    customElements.define(name, WebComponent);
}
