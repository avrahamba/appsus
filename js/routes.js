import homePage from './apps/marge/pages/home-page.cmp.js'
import aboutPage from './apps/marge/pages/about-page.cmp.js'

import bookAdd from './apps/miss-books/pages/book-add.cmp.js'
import bookApp from './apps/miss-books/pages/book-app.cmp.js'
import bookPage from './apps/miss-books/pages/book-details.cmp.js'

import keepApp from './apps/miss-keep/pages/keep-app.cmp.js';


const routes = [
    {path: '/', component: homePage},

    {path: '/books', component: bookApp},
    {path: '/books/add', component: bookAdd},
    {path: '/books/:id', component: bookPage},

    {path: '/miss-keep', component: keepApp},

    {path: '/about', component: aboutPage},
]
const router = new VueRouter({routes})

export default router;