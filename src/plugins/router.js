import {createRouter, createWebHistory} from 'vue-router';
import home from '../pages/home';
import blog from '../pages/blog';
import project from '../pages/project';
import about from '../pages/about';

const routes = [
  {path: '/', component: home},
  {path: '/blog', component: blog},
  {path: '/project', component: project},
  {path: '/about', component: about},
]

const Router = createRouter({
  history: createWebHistory(),
  routes,
})
export default Router