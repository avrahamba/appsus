import {emailService} from '../../../services/mister-email/email.service.js';

export default {
    template:`
    <section class="email-status" v-if="status">
        <div>Email: {{status.allEmails}}</div>
        <div>new: {{status.unreadedEmails}}</div>

    </section>
    `,
    data() {
        return {
            status: null      
        }
    },
    created() {
        emailService.getStatus()
            .then(status => this.status = status)
    },
}