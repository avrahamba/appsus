import emailList from './email-list.cmp.js';
import emailMenu from '../cmps/email-menu.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import {emailService} from '../../../services/mister-email/email.service.js';

export default {
    template: `
        <main class="email-app">
            <email-filter></email-filter>
            <email-menu></email-menu>
            <router-view></router-view>
            <!-- <email-list v-if="emailsLife" :emails="emailsLife"></email-list> -->
        </main>
    `,
    components:{
        emailList,
        emailMenu,
        emailFilter
    }
}