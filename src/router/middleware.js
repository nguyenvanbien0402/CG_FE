const publicPages = ['/login'];

import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const Middleware = {
  doFilter: (to, next) => {
    const authRequired = !(publicPages.includes(to.path));
    const loggedIn = cookies.isKey('Authorization');

    if (to.path === '/') {
      next('/user-list');
    }
     if (authRequired && !loggedIn) {
       next('/login');
    } else if (!authRequired && loggedIn) {
       next('/user-list');
    } else {
       next();
     }
  }
};

export default Middleware;
