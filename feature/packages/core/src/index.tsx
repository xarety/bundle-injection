import React from 'react';
import ReactDOM from 'react-dom';

import retargetEvents from 'react-shadow-dom-retarget-events';

import { App } from './app';

const currentDir = (document.currentScript as HTMLScriptElement).src
    .split('/')
    .slice(0, -1)
    .join('/');

class Feature extends HTMLElement {
    mountPoint = document.createElement('div');

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `<link href="${currentDir}/index.css" rel="stylesheet">`;
        shadowRoot.appendChild(this.mountPoint);

        retargetEvents(shadowRoot);

        ReactDOM.render(<App />, this.mountPoint);
    }

    disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this.mountPoint);
    }
}

customElements.define('st-feature', Feature);
