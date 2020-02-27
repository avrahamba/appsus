import {utilService} from '../../../services/util.service.js';
import {emailService} from '../../../services/mister-email/email.service.js';
export default {
    template:`
    <section @click="openClose" :class="{'is-read': email.isRead}" class="email-preview">
        <span class="subject">{{email.subject}}</span>
        <span class="time">{{sendAt}}</span> 
        <button @click.stop="deleteEmail">
            delete
        </button>

        <section v-if="isOpen">
            <p>
                {{email.body}}
            </p>
        </section>  
    </section>
    `,
    props:{
        email: Object
    },
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        sendAt(){
            return utilService.timeConverter(this.email.sentAt)
        }
    },
    methods: {
        openClose(){
            this.isOpen = !this.isOpen;
            emailService.readEmail(this.email.id)
        },
        deleteEmail(){
            emailService.deleteEmail(this.email.id)
        }
    },
}