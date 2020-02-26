import {eventBus, EVENT_CLEAR} from '../../../../services/event-bus.service.js';
export default {
    template:`
    <div class="add-note-todo">
    <ul>
        <li v-for="(todo, inx) in info.todos" :key="inx">
            <input 
                type="text" 
                v-model="info.todos[inx]"
                @input="$emit('input',info)"
                placeholder="Add todo"
                @focus="focusTodo(inx)"
            >
        </li>
        <li>
            <div class="add-dec">
                <button class="link" @click="add">➕</button>
                <button class="link" @click="dec">➖</button>
            </div>
        </li>
    </ul>
    
    </div>
    `,
    data() {
        return {
            info:{
                type:'todo',
                todos:[
                    ''
                ]
            }
        }
    },
    methods: {
        add(){
            this.info.todos.push('');
        },
        dec(){
            if(this.info.todos.length === 1)return
            this.info.todos.pop();
        },
        focusTodo(inx){
            if(inx===this.info.todos.length-1) this.add()
        }
    },
    created() {
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