import { registerWC } from '@sandboxes/platform';
import { App } from './app';
import axios from 'axios';

axios.defaults.baseURL = 'https://yandex.ru/';

declare global {
    const BUNDLE_TYPE: 'full' | 'light';
}

if (BUNDLE_TYPE === 'full') {
    require('./vendor.css');
    registerWC('st-feature', App, false);
} else {
    registerWC('st-feature', App, true);
}
