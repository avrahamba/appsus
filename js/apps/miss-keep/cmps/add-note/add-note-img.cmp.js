import {eventBus, EVENT_CLEAR} from '../../../../services/event-bus.service.js';

export default {
    template:`
    <div class="add-note-img">
        <input 
        type="text" 
        v-model="info.url" 
        @input="$emit('input',info)"
        placeholder="Please enter URL for image"
        @focus="isShowTitle = true"
        >
        <input 
        v-show="isShowTitle"
        type="text" 
        v-model="info.title" 
        placeholder="Please enter title"
        @input="$emit('input',info)"
        @focus="isShowText = true"
        >
        <textarea
        cols="31" 
        v-show="isShowText"
        v-model="info.txt" 
        placeholder="Please enter text"
        @input="$emit('input',info)"></textarea>
        
    </div>
    `,
    data() {
        return {
            info:{
                type:'img',
                url:'',
                title:'',
                text:''
            },
            isShowTitle:false,
            isShowText:false,
        }
    },
    created() {
        this.$emit('input',this.info)
        eventBus.$on(EVENT_CLEAR,()=>{
            this.info={
                type:'img',
                url:'',
                title:'',
                txt:'',
            }
            this.show=false
        })
    },
}