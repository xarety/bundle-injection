import { register } from '@sandboxes/web-components';
import { App } from './app';

declare global {
    const WEB_COMPONENT: 'full' | 'light';
}

if (WEB_COMPONENT === 'full') {
    require('./vendor.css');
    register('st-feature', App, false);
} else {
    register('st-feature', App, true);
}
