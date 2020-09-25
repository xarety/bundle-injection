import { WebComponents, WebComponent } from '@sandboxes/startup';
import { App } from './app';

declare global {
    const WEB_COMPONENT: WebComponent;
}

if (WEB_COMPONENT === WebComponent.Full) {
    require('./vendor.css');
    WebComponents.register('st-feature', App, false);
} else {
    WebComponents.register('st-feature', App, true);
}
