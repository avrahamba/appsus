import router from './routes.js'

import appHeader from './apps/marge/cmps/app-header.cmp.js';
import txtMsg from './apps/marge/cmps/txt-msg.cmp.js';
import {eventBus,EVENT_CLOSE_MODAL} from './services/event-bus.service.js';

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
            <footer><div>coffiright 2020</div></footer>
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
            document.body.classList.remove('open-bar');
            eventBus.$emit(EVENT_CLOSE_MODAL)
        }
    },
})