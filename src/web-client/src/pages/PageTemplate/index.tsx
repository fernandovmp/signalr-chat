import React from 'react';
import { SideBar } from '../../components';
import { Switch, Route } from 'react-router-dom';
import { PageRoute } from '../../utils/PageRouteType';
import { getPageTemplateStyles } from './styles';

type propsType = {
    routes: PageRoute[];
};

const PageTemplate: React.FC<propsType> = ({ routes }) => {
    const {
        pageTemplate,
        pageSideBar,
        pageHeader,
        pageMain,
    } = getPageTemplateStyles();
    return (
        <div className={pageTemplate}>
            <SideBar styles={[pageSideBar]} />
            <header className={pageHeader}>
                <Switch>
                    {routes.map((page, index) => (
                        <Route
                            key={index}
                            path={page.path}
                            exact={page.exact}
                            children={<page.header />}
                        />
                    ))}
                </Switch>
            </header>
            <main className={pageMain}>
                <Switch>
                    {routes.map((page, index) => (
                        <Route
                            key={index}
                            path={page.path}
                            exact={page.exact}
                            children={<page.main />}
                        />
                    ))}
                </Switch>
            </main>
        </div>
    );
};

export default PageTemplate;
