import { createRouter, createWebHistory } from 'vue-router';
import NotFound from './NotFound.vue';

const routes = [
  { name: 'Main',
    path: '/',
    component: () => import('./views/Main.vue')
  },

  { name: 'Translater',
    path: '/translat',
    component: () => import('./views/Translater.vue') 
  },

  { name: 'Readtext',
    path: '/reade',
    component: () => import('./views/ReadText.vue') 
  },

  { name: 'Grammatic',
    path: '/grammar',
    component: () => import('./views/Grammatic.vue') 
  },

  { name: 'History',
    path: '/history',
    component: () => import('./views/History.vue')
  },

  // { name: 'Pers_Account',
  //   path: '/person_user',
  //   component: () => import('./views/Pers_Account.vue')
  // },

  { name: 'Redaktor_Text',
    path: '/redaktor',
    component: () => import('./views/Redaktor_Text.vue')
  },
  { name: 'Users',
    path: '/user/*',
    component: () => import('./users/Users.vue')
  },
  { 
    path: '/:NotFound', name: 'NotFound', component: NotFound
  }
  ,{
    path: '/user/:id', name: 'User_Id', component: () => import('./users/Users.vue'), meta: {requireAuth: true}
  },
  {
    path: '/regustr', name: 'Regustr', component: () => import('./users/Regustratioons.vue')
  }
  // Для копирования
  // { name: '',
  //   path: '/',
  //   component: },
];

// route.beforeEach((to, from, next) => {
//   const isAsuth = localStorage.getItem('jwtToken');
//   if(to.meta.requireAuth && !isAsuth){
//     next('/user/:id')
//   }
//   else{
//     next();
//   }
// });

const router = createRouter({
  history: createWebHistory(),
  //mode hash - эксперимент, ради устранения ошибки 404 при перезгрузке страницы
  mode: "hash",
  routes
});

export default router;
