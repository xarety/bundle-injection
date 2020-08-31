import React from 'react';

import { IWidget } from '@sandboxes/feature-abstractions';

export const Widget: IWidget = ({ title, message }) => (
    <div>
        <h1>{title}</h1>
        <div>{message}</div>
    </div>
);