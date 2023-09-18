import { ComponentType } from "react";
import Login from "../pages/Login/Login";
import ContactList from "../pages/ContactList/ContactList";
import NotFound from "../pages/NotFound/NotFound";

export interface Route {
  path: string,
  component: ComponentType,
  exact?: boolean,
  children?: JSX.Element
}

export enum RouteNames {
  ROOT = '/',
  LOGIN = '/login',
  CONTACTS = '/contacts',
  NOTFOUND = '/not-found',
}

export const publicRoutes: Route[] = [
  {
    path: RouteNames.ROOT,
    component: Login
  },
  {
    path: RouteNames.LOGIN,
    component: Login
  },
  {
    path: RouteNames.NOTFOUND,
    component: NotFound
  },
]

export const privateRoutes: Route[] = [
  {
    path: RouteNames.CONTACTS,
    component: ContactList
  },
]

