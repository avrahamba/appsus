import emailPreview from '../cmps/email-preview.cmp.js';
import {emailService} from '../../../services/mister-email/email.service.js';
import {eventBus, EVENT_CHANGE_FILTER_EMAIL} from '../../../services/event-bus.service.js';

export default {
    template:`
    <section class="email-list">
        <ul v-if="emailsLife">
            <li v-for="(email, inx) in emailsLife" :key="inx">
                <email-preview :email="email"></email-preview>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            emails: null,
            filterBy:{
                isReaded: 'all',
                txt:''
            }
        }
    },
    created() {
        emailService.getEmails()
            .then(emails => this.emails = emails);
        eventBus.$on(EVENT_CHANGE_FILTER_EMAIL,(filterBy=>this.filterBy=filterBy))
    },
    computed: {
        emailsLife(){
            if(!this.emails) return null
            return this.emails
                .filter(email=>!email.isDeleted)
                .filter((email)=>{
                    if(this.filterBy.isReaded==='readed'&&!email.isRead)return false
                    if(this.filterBy.isReaded==='unreaded'&&email.isRead)return false
                    if(!this.filterBy.txt.trim())return true
                    if(email.subject.includes(this.filterBy.txt.trim())||
                        email.body.includes(this.filterBy.txt.trim())
                        )return true;
                    return false;
                })
        }
    },
    components:{
        emailPreview
    },
}