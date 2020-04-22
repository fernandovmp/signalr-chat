import { PageRoute } from '../../utils/PageRouteType';
import { ExploreHeader } from './ExploreHeader';
import { ExploreMain } from './ExploreMain';
import { SideBar } from '../../components';

export const ExplorePage: PageRoute = {
    path: '/explore',
    exact: true,
    header: ExploreHeader,
    main: ExploreMain,
    sidebar: SideBar,
};
