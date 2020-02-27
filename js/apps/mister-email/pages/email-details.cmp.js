import {emailService} from '../../../services/mister-email/email.service.js';

export default {
    template:`
        <section v-if="email" class="email-details">
            <h2>{{email.subject}}</h2>
            <p>{{email.body}}</p>
            <button @click="closeEmail">
                <i class="fa fa-compress"></i>
            </button>
            <button @click="deleteEmail">
                <i class="fa fa-trash"></i>
            </button>
            <!-- <pre v-if="email">{{email}}</pre> -->
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