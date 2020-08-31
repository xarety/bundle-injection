import React from 'react';

import { IWidget } from '@sandboxes/feature-abstractions';

import Styles from './widget.module.css';

export const Widget: IWidget = ({ title, message }) => (
    <div>
        <div>Injected component</div>
        <h1 className={Styles.header}>{title}</h1>
        <div>{message}</div>
    </div>
);
