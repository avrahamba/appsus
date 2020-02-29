import router from './routes.js'

import appHeader from './apps/marge/cmps/app-header.cmp.js';
import txtMsg from './apps/marge/cmps/txt-msg.cmp.js';


new Vue({
    el: '#app',
    template: `
        <section class="my-app">
            <header>
                <app-header></app-header>
            </header>
            <div class="fake-header"></div>
            <router-view></router-view>
            <txt-msg></txt-msg>
            <div class="screen" @click="closeBar"></div>
        </section>
    `,
    router,
    components:{
        appHeader,
        txtMsg
    },
    methods: {
        closeBar(){
            document.body.classList.remove('open-bar')
        }
    },
})