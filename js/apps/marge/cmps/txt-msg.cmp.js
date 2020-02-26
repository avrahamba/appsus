import {eventBus, EVENT_SHOW_MSG} from '../../../services/event-bus.service.js';
export default {
    template:`
        <section v-if="isSown" class="txt-msg" :class="classContain">
            {{txt}}
            <div>
                <button @click="isSown = false">Close</button>
            </div>
        </section>
    `,
    data() {
        return {
            txt:'',
            secss:true,
            isSown:false
        }
    },
    computed: {
        classContain(){
            if(this.secss) return 'secss'
            return 'unsecss'
        }
    },
    created() {
        eventBus.$on(EVENT_SHOW_MSG,(txt)=>{
            this.txt = txt;
            this.isSown = true;
            setTimeout(()=>{this.isSown = false},2000)
        })
    },

}