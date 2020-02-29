import {utilService} from '../../../services/util.service.js';
import {emailService} from '../../../services/mister-email/email.service.js';
export default {
    template:`
    <section @click="openClose" 
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="{'is-read': email.isRead, 'isOpen': isOpen}" 
    class="email-preview">
        <section>
            <span>
                <span class="subject">{{email.subject}}</span>
                <span>{{email.send}}</span>
            </span>
            
            <div v-if="hover" class="btns">
                <button @click.stop="setStar" :class="starClass">
                    <i class="fa fa-star"></i>
                </button>
                <button v-if="email.isDeleted" @click.stop="restor">
                    <i class="fa fa-arrow-up"></i>
                </button>
                <button @click.stop="deleteEmail">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
            <span v-else class="time">{{sendAt}}</span> 
        </section>
        
        
        <section v-if="isOpen">
            <p class="body">
                {{shortBody}}
            </p>
            <div class="rigth">

                <button @click.stop="openEmail">
                    <i class="fa fa-expand"></i>
                </button>
            </div>
        </section>  
    </section>
    `,
    props:{
        email: Object
    },
    data() {
        return {
            isOpen: false,
            hover: false
        }
    },
    computed: {
        sendAt(){
            return utilService.timeConverter(this.email.sentAt)
        },
        shortBody(){
            return `${this.email.body.substr(0,50)}${(this.email.body.length>49)?'...':''}`;
        },
        starClass(){
            if(this.email.star) return 'star-active'
        }
    },
    methods: {
        openClose(){
            this.isOpen = !this.isOpen;
            emailService.readEmail(this.email.id)
        },
        deleteEmail(){
            emailService.deleteEmail(this.email.id)
        },
        openEmail(){
            this.$router.push(`/mister-email/${this.email.id}`)
        },
        setStar(){
            emailService.setStar(this.email.id)
        },
        restor(){
            emailService.restorEmail(this.email.id)
        }
    },
}