import {emailService} from '../../../services/mister-email/email.service.js';

export default {
    template:`
    <section class="draft-preview">
            <span>
                <span class="subject">{{draft.subject}}</span>
                <span>{{draft.send}}</span>
            </span>
            

            <div class="btns">
                <button @click.stop="edit">
                    <i class="fa fa-edit"></i>
                </button>
                <button @click.stop="deleteDraft">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </section>
    `,
    props:{
        draft: Object
    },
    methods: {
        edit(){
            this.$router.push('/mister-email/compose/'+this.draft.id)
        },
        deleteDraft(){
            emailService.deleteDraft(this.draft.id)
        }
    },
}