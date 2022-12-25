export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  FORBIDDEN = 'forbidden',
  ADMIN_PANEL = 'admin_panel',
  ARTICLE_EDIT = 'article_edit',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_DETAILS = 'article_details',
  // last
  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteAdmin = () => '/admin';
export const getRouteArticles = () => '/articles';
export const getRouteForbidden = () => '/forbidden';
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticleDetails = (id: string = '0') => `/articles/${id}`;
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
