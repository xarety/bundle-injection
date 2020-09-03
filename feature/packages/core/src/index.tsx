import React from 'react';
import ReactDOM from 'react-dom';

import retargetEvents from 'react-shadow-dom-retarget-events';

import { App } from './app';

class Feature extends HTMLElement {
    mountPoint = document.createElement('div');

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = '<link href="index.css" rel="stylesheet">';
        shadowRoot.appendChild(this.mountPoint);

        retargetEvents(shadowRoot);

        ReactDOM.render(<App />, this.mountPoint);
    }

    disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this.mountPoint);
    }
}

window.customElements.define('feature', Feature);
