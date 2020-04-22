import React from 'react';
import { PageRoute } from '../../utils/PageRouteType';
import { CreateChannelForm, SideBar } from '../../components';

export const CreateChannelPage: PageRoute = {
    path: '/create-channel',
    exact: false,
    header: () => <></>,
    main: CreateChannelForm,
    sidebar: SideBar,
};
