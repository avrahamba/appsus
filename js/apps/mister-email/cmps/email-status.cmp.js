import {emailService} from '../../../services/mister-email/email.service.js';
import {eventBus,EVENT_CHANGE_STATUS_EMAIL} from '../../../services/event-bus.service.js';

export default {
    template:`
    <section class="email-status" v-if="status">
        <div>Emails: {{status.allEmails}}</div>
        <div>New: {{status.unreadedEmails}}</div>

    </section>
    `,
    data() {
        return {
            status: null      
        }
    },
    created() {
        emailService.getStatus()
            .then(status => this.status = status);
        
        eventBus.$on(EVENT_CHANGE_STATUS_EMAIL,()=>{
            emailService.getStatus()
                .then(status => this.status = status);
        })
    },
}