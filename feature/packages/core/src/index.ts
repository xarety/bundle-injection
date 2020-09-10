import { registerWC } from '@sandboxes/platform';
import { App } from './app';

declare global {
    const BUNDLE_TYPE: 'full' | 'light';
}

if (BUNDLE_TYPE === 'full') {
    require('./vendor.css');
}

registerWC('st-feature', App);
