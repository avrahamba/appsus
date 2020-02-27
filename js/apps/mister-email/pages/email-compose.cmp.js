import {emailService} from '../../../services/mister-email/email.service.js';

export default {
    template:`
        <section class="email-compose">
            <input v-model="subject" type="text" placeholder="subject">
            <textarea v-model="body" cols="30" rows="10" placeholder="body"></textarea>
            <button @click="send">send</button>
        </section>
    `,
    data() {
        return {
            subject:'',
            body:''
        }
    },
    methods: {
        send(){
            emailService.sendEmail({subject:this.subject,body:this.body})
            .then(()=>this.$router.push('/mister-email'))
        }
    },
}