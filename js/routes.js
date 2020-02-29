import homePage from './apps/marge/pages/home-page.cmp.js'
import aboutPage from './apps/marge/pages/about-page.cmp.js'

import bookAdd from './apps/miss-books/pages/book-add.cmp.js'
import bookApp from './apps/miss-books/pages/book-app.cmp.js'
import bookPage from './apps/miss-books/pages/book-details.cmp.js'

import keepApp from './apps/miss-keep/pages/keep-app.cmp.js';

import misterEmail from './apps/mister-email/pages/email-app.cmp.js';
import emailList from './apps/mister-email/pages/email-list.cmp.js';
import emailCompose from './apps/mister-email/pages/email-compose.cmp.js';
import emailDetails from './apps/mister-email/pages/email-details.cmp.js';
import emailStarred from './apps/mister-email/pages/email-starred.cmp.js';
import emailDeleted from './apps/mister-email/pages/email-deleted.cmp.js';
import emailDraftList from './apps/mister-email/pages/draft-list.cmp.js';

const routes = [
    {path: '/', component: homePage},

    {path: '/books', component: bookApp},
    {path: '/books/add', component: bookAdd},
    {path: '/books/:id', component: bookPage},

    {path: '/miss-keep', component: keepApp},
    
    {path: '/mister-email', component: misterEmail, children:[
      {path: '', component: emailList},
      {path: 'compose/:id?', component: emailCompose},  
      {path: 'starred', component: emailStarred},  
      {path: 'deleted', component: emailDeleted},  
      {path: 'sent', component: emailList},  
      {path: 'drafts', component: emailDraftList},  
      {path: ':id', component: emailDetails},  
    ]},
    {path: '/about', component: aboutPage},
]
const router = new VueRouter({routes})

export default router;