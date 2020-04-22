import { ChatComponent, SideBar } from '../../components';
import { PageRoute } from '../../utils/PageRouteType';
import { ChatHeader } from '../../components/ChatComponent/ChatHeader';

export const ChatPage: PageRoute = {
    path: '/chat/:id',
    exact: false,
    header: ChatHeader,
    main: ChatComponent,
    sidebar: SideBar,
};
