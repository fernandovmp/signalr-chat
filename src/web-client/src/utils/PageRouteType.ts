import React from 'react';
import { ComponentWithStylesType } from '../styles/ComponentWithStylesType';

export type PageRoute = {
    path: string;
    exact: boolean;
    header: React.FC;
    main: React.FC;
    sidebar: React.FC<ComponentWithStylesType>;
};
