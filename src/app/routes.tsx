import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { accessibleRouteChangeHandler } from '@app/utils/utils';
import { Home } from '@app/Home/Home';
import { BoardMinutes } from '@app/BoardMinutes/BoardMinutes';
import { BoardMembers } from '@app/BoardMinutes/BoardMembers';
import { RecTeams } from '@app/RecTeams/RecTeams';
import { TravelTeams } from '@app/TravelTeams/TravelTeams';
import { FieldInfo } from '@app/FieldInfo/FieldInfo';
import { Forms } from '@app/Forms/Forms';
import { Shop } from '@app/Shop/Shop';
import { FAQ } from '@app/FAQ/FAQ';
import { Sponsors } from '@app/Sponsors/Sponsors';
import { NotFound } from '@app/NotFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';

let routeFocusTimer: number;
export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path: string;
  title: string;
  isAsync?: boolean;
  routes?: undefined;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
  {
    component: Home,
    exact: true,
    label: 'Home',
    path: '/',
    title: 'Tornados Home Page | Main Dashboard',
  },
  {
    label: 'About Us',
    routes: [
      {
        component: BoardMinutes,
        exact: true,
        label: 'Board Meetings & Minutes',
        path: '/boardminutes',
        title: 'Board Meetings & Minutes',
      },
      {
        component: BoardMembers,
        exact: true,
        label: 'Board Members',
        path: '/boardmembers',
        title: 'Board Members',
      },
    ],
  },
  {
    label: 'Teams',
    routes: [
      {
        component: RecTeams,
        exact: true,
        label: 'Rec Teams',
        path: '/recteams',
        title: 'Rec Teams',
      },
      {
        component: TravelTeams,
        exact: true,
        label: 'Travel Teams',
        path: '/travelteams',
        title: 'Travel teams',
      },
    ],
  },
  {
    component: FieldInfo,
    exact: true,
    label: 'Field Information',
    path: '/fieldinfo',
    title: 'Field Information',
  },
  {
    component: Shop,
    exact: true,
    label: 'Shop',
    path: '/shop',
    title: 'Tornados Shop',
  },
  {
    component: FAQ,
    exact: true,
    label: 'FAQ',
    path: '/faq',
    title: 'Tornados FAQ',
  },
  {
    component: Sponsors,
    exact: true,
    label: 'Sponsors',
    path: '/sponsors',
    title: 'Tornados Sponsors',
  },
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
const useA11yRouteChange = (isAsync: boolean) => {
  const lastNavigation = useLastLocation();
  React.useEffect(() => {
    if (!isAsync && lastNavigation !== null) {
      routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      window.clearTimeout(routeFocusTimer);
    };
  }, [isAsync, lastNavigation]);
};

const RouteWithTitleUpdates = ({ component: Component, isAsync = false, title, ...rest }: IAppRoute) => {
  useA11yRouteChange(isAsync);
  useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <Component {...rest} {...routeProps} />;
  }

  return <Route render={routeWithTitle} {...rest}/>;
};

const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[]
);

const AppRoutes = (): React.ReactElement => (
  <LastLocationProvider>
    <Switch>
      {flattenedRoutes.map(({ path, exact, component, title, isAsync }, idx) => (
        <RouteWithTitleUpdates
          path={path}
          exact={exact}
          component={component}
          key={idx}
          title={title}
          isAsync={isAsync}
        />
      ))}
      <PageNotFound title="404 Page Not Found" />
    </Switch>
  </LastLocationProvider>
);

export { AppRoutes, routes };
