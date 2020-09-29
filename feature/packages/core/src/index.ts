import { register } from '@sandboxes/web-components';
import { App } from './app';

declare global {
    const WEB_COMPONENT: 'full' | 'light';
}

if (WEB_COMPONENT === 'full') {
    require('./design-system.css');
    register(App, false);
} else {
    register(App, true);
}
