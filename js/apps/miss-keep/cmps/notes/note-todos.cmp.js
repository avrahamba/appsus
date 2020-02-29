import {noteService} from '../../../../services/miss-keep/notes.service.js';
import {emailService} from '../../../../services/mister-email/email.service.js';


export default {
    template: `
    <div class="note-todos open-note" :style="{'background-color': info.color}">
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
        <div class="color-btns">

            <template v-if="colorOpen">
                <button @click.stop="colorSet('#ffd299')">
                    <i class="fa fa-tint" :style="{color: '#f8981d'}"></i>
                </button>
                <button @click.stop="colorSet('#e1f2fb')">
                    <i class="fa fa-tint" :style="{color: 'blue'}"></i>
                </button>
                <button @click.stop="colorSet('#f0e1fb')">
                    <i class="fa fa-tint" :style="{color: '#a438f2'}"></i>
                </button>
                <button @click.stop="colorSet('#c6f2c9')">
                    <i class="fa fa-tint" :style="{color: 'green'}"></i>
                </button>
                <button @click.stop="colorSet('#f2c6c6')">
                    <i class="fa fa-tint" :style="{color: 'red'}"></i>
                </button>
            </template>  
            <button @click.stop="colorSet" v-else >
                <i class="fa fa-paint-brush"></i>
            </button>
        </div>
        <div class="btns">
            <button class="send" @click="sendAsMail" :title="editSave">
                <i class="fa fa-send"></i>
            </button>
            <button class="edit" @click="startEditOrSave" :title="editSave">
                <i class="fa" :class="srcImgEdit"></i>
            </button>
            <button class="close" @click="$emit('close')" title="close">
                <i class="fa fa-close"></i>
            </button>
            <button @click.stop="pin" title="pin">
                <i class="fa fa-map-pin"></i>
            </button>
            <button class="remove" @click="$emit('remove')" title="remove">
                <i class="fa fa-trash"></i>
            </button>
        </div> 
  </div>
    `,
    props:{
        info: Object,
        id: String
    },
    data() {
        return {
            edit:false,
            infoCopy:null,
            colorOpen:false
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
        },
        colorSet(color){
            if(typeof color === 'string'){
                noteService.setColor(this.id, color)
            }
            this.colorOpen = !this.colorOpen
        },
        pin(){
            noteService.setPin(this.id)
        },
        sendAsMail(){
            const body = this.info.todoList.map((todo,inx)=>`${inx+1}. ${todo.txt}\n`).join('')
            emailService.saveDraft({subject:this.info.title, body})
            .then(draftId=>this.$router.push(`/mister-email/compose/${draftId}`))
        }
    },

}