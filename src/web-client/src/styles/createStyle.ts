import { mergeStyleSets } from '@uifabric/styling';
import { memoizeFunction } from '@uifabric/utilities';
import { CustomStyleSet } from '../utils/CustomStyleSetType';

export function cretaeStyle<T>(styles: CustomStyleSet<T>) {
    return memoizeFunction(() => mergeStyleSets(styles));
}
