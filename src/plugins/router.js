import { createRouter, createWebHistory } from 'vue-router';
import home from '../pages/home';
import blog from '../pages/blog';
import project from '../pages/project';
import about from '../pages/about';

const routes = [
  {
    path: '/', component: home, meta: {
      title: "Home", icon: ["fa", "home"]
    }
  },
  {
    path: '/blog', component: blog, meta: {
      notshow: true, title: "Blog", icon: ["fa", "blog"]
    }
  },
  {
    path: '/project', component: project, meta: {
      title: "Project", icon: ['fas', 'project-diagram']
    },
  },
  {
    path: '/about', component: about, meta: {
      title: "About", icon: ['fas', 'address-card']
    },
  }
]

const Router = createRouter({
  history: createWebHistory(),
  routes,
})
export default Router