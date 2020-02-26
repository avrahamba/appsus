import {noteService} from '../../../../services/miss-keep/notes.service.js';

export default {
    template: `
    <div class="note-todos">
        <template v-if="edit">
        <ul>
            <li v-for="(todo, inx) in infoCopy.todoList" :key="inx">
                <input type="text" v-model="infoCopy.todoList[inx].txt">
            </li>
        </ul>
        <button @click="addTodo">+</button>
        </template>
        <ul v-else>
            <li v-for="(todo, inx) in info.todoList" :key="inx">
                <span @click="signTodo(inx)" :class="{'todo-doed': todo.do}">
                    {{todo.txt}}
                </span>
            </li>
        </ul>

        <button @click="startEditOrSave">
            {{txtEdit}}
        </button>
        <button @click="$emit('close')">
            Close
        </button>
        <button @click="$emit('remove')">
            remove
        </button>
  </div>
    `,
    props:{
        info: Object,
        id: String
    },
    data() {
        return {
            edit:false,
            infoCopy:null
        }
    },
    created() {
        this.infoCopy = JSON.parse(JSON.stringify(this.info)) 
    },
    computed: {
        txtEdit(){
            if(this.edit) return 'Save'
            return 'Edit'
        }
    },
    methods: {
        startEditOrSave(){
            if(this.edit){
                noteService.saveNote({id:this.id,info:this.infoCopy})
            }
            this.edit = !this.edit
        },
        addTodo(){
           this.infoCopy.todoList.push({ id: this.infoCopy.todoList.length, txt: '', do: false })
        },
        signTodo(inx){
            noteService.setTodo(this.id,inx)
            this.infoCopy.todoList[inx].do = true
        }
    },

}