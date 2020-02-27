import {noteService} from '../../../../services/miss-keep/notes.service.js';

export default {
    template: `
    <div class="note-todos open-note">
        <template v-if="edit">
        <ul>
            <li v-for="(todo, inx) in infoCopy.todoList" :key="inx">
                <input type="text" v-model="infoCopy.todoList[inx].txt">
            </li>
            <button @click="addTodo">+</button>
        </ul>
        </template>
        <ul v-else> 
            <li v-for="(todo, inx) in info.todoList" :key="inx">
                <span @click="signTodo(inx)" :class="{'todo-doed': todo.do, 'todo-li':true}">
                    {{todo.txt}}
                </span>
            </li>
        </ul>

        <button class="edit" @click="startEditOrSave" :title="editSave">
        <i class="fa" :class="srcImgEdit"></i>
        </button>
        <button class="close" @click="$emit('close')" title="close">
        <i class="fa fa-close"></i>
        </button>
        <button class="remove" @click="$emit('remove')" title="remove">
        <i class="fa fa-trash"></i>
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
    computed: {
        srcImgEdit(){
            if(this.edit) return 'fa-save'
            return 'fa-edit'
        },
        editSave(){
            if(this.edit) return 'Save'
            return 'Edit'
        }
    },
    methods: {
        startEditOrSave(){
            if(this.edit){
                noteService.saveNote({id:this.id,info:this.infoCopy})
            }else{
                this.infoCopy = JSON.parse(JSON.stringify(this.info)) 

            }
            this.edit = !this.edit
        },
        addTodo(){
           this.infoCopy.todoList.push({ id: this.infoCopy.todoList.length, txt: '', do: false })
        },
        signTodo(inx){
            noteService.setTodo(this.id,inx)
        }
    },

}