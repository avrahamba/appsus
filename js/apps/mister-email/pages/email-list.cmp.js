import emailPreview from '../cmps/email-preview.cmp.js';
import {emailService} from '../../../services/mister-email/email.service.js';

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
            emails: null
        }
    },
    created() {
        emailService.getEmails()
            .then(emails => this.emails = emails)
    },
    computed: {
        emailsLife(){
            if(!this.emails) return null
            return this.emails.filter(email=>!email.isDeleted)
        }
    },
    components:{
        emailPreview
    },
}