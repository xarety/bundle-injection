import React from 'react';
import ReactDOM from 'react-dom';

import 'es-module-shims';

declare global {
    const importShim: <T>(id: string, parentUrl?: string) => Promise<T>;
}

import { App } from './app';

const appContainer = document.createElement('div');
document.body.appendChild(appContainer);

ReactDOM.render(<App />, appContainer);
