import React from 'react';
import ReactDOM from 'react-dom';

import retargetEvents from 'react-shadow-dom-retarget-events';

import { App } from './app';

class Feature extends HTMLElement {
    path = new URL((document.currentScript as HTMLScriptElement).src).origin;
    mountPoint = document.createElement('div');

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const x = document.currentScript;
        debugger;
        shadowRoot.innerHTML = `<link href="${this.path}/index.css" rel="stylesheet">`;
        shadowRoot.appendChild(this.mountPoint);

        retargetEvents(shadowRoot);

        ReactDOM.render(<App />, this.mountPoint);
    }

    disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this.mountPoint);
    }
}

customElements.define('st-feature', Feature);
