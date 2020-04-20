import { PageRoute } from '../../utils/PageRouteType';
import { ExploreHeader } from './ExploreHeader';
import { ExploreMain } from './ExploreMain';

export const ExplorePage: PageRoute = {
    path: '/explore',
    exact: true,
    header: ExploreHeader,
    main: ExploreMain,
};
