import { IStyle } from '@uifabric/styling';

export type CustomStyleSet<T> = {
    [P in keyof T]: IStyle;
};
