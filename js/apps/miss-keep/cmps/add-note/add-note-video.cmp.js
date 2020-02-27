import {eventBus, EVENT_CLEAR} from '../../../../services/event-bus.service.js';
export default {
    template:`
    <div class="add-note-video">
        <input 
        type="text" 
        v-model="info.url" 
        @input="$emit('input',info)"
        placeholder="Pleas enter URL of Youtube video"
        >
    </div>
    `,
        data() {
            return {
                info:{
                    type:'video',
                    url:''
                }
            }
        },
        created() {
            this.$emit('input',this.info)
            eventBus.$on(EVENT_CLEAR,()=>{
                this.info={
                    type:'video',
                    url:'',
                }
                this.show=false
            })
        },
    
}