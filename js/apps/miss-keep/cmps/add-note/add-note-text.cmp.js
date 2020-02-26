import {eventBus, EVENT_CLEAR} from '../../../../services/event-bus.service.js';
export default {
    template:`
    <div class="add-note-text">
    <input type="text"
        v-model="info.title" 
        placeholder="Pleas enter title"
        @input="$emit('input',info)"
        @focus="show = true"
    >
    <textarea 
        cols="31"
        v-show="show"
        v-model="info.txt" 
        placeholder="Pleas enter text"
        @input="$emit('input',info)"></textarea>
    </div>
    `,
    data() {
        return {
            info:{
                type:'txt',
                title:'',
                txt:'',
            },
            show:false
        }
    },
    created() {
        this.$emit('input',this.info)
        eventBus.$on(EVENT_CLEAR,()=>{
            this.info={
                type:'txt',
                title:'',
                txt:'',
            }
            this.show=false
        })
    },
    
}