import {emailService} from '../../../services/mister-email/email.service.js';

export default {
    template:`
        <section v-if="email" class="email-details">
            <h2>{{email.subject}}</h2>
            <h3>{{'from: '+email.send}}</h3>
            <p>{{email.body}}</p>
            <div class="btn">
                <button @click="closeEmail">
                    <i class="fa fa-compress"></i>
                </button>
                <button @click="deleteEmail">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </section>
    `,
    data() {
        return {
            email:null
        }
    },
    created() {
        emailService.getEmailById(this.$route.params.id)
            .then(email=>this.email=email)        
    },
    methods: {
        closeEmail(){
            this.$router.push('/mister-email')
        },
        deleteEmail(){
            emailService.deleteEmail(this.email.id);
            this.$router.push('/mister-email')
        }
    },
}