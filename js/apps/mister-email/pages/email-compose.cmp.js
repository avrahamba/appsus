import {emailService} from '../../../services/mister-email/email.service.js';

export default {
    template:`
        <section class="email-compose">
            <input v-model="subject" type="text" placeholder="Subject">
            <input v-model="sendTo" type="text" placeholder="Send To">
            <textarea v-model="body" cols="30" rows="10" placeholder="Body"></textarea>
            <div class="btns">

                <button @click="save"><i class="fa fa-save"></i></button>
                <button @click="send"><i class="fa fa-send"></i></button>
            </div>
        </section>
    `,
    data() {
        return {
            subject:'',
            body:'',
            sendTo:''
        }
    },
    created() {
        if(this.$route.params.id){
            emailService.getDraftById(this.$route.params.id)
            .then(draft=>{
                this.subject = draft.subject
                this.body = draft.body
                this.sendTo = draft.send
                emailService.deleteDraft(draft.id)
            })        
        }

    },
    methods: {
        send(){
            emailService.sendEmail({subject:this.subject,sendTo:this.sendTo,body:this.body})
            .then(()=>this.$router.push('/mister-email'))
        },
        save(){            
            emailService.saveDraft({subject:this.subject,sendTo:this.sendTo,body:this.body})
            .then(()=>this.$router.push('/mister-email/drafts'))
        }
    },
}