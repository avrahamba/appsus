import addText from './add-note-text.cmp.js';
import addImg from './add-note-img.cmp.js';
import addTodo from './add-note-todo.cmp.js';
import addVideo from './add-note-video.cmp.js';
import {noteService} from '../../../../services/miss-keep/notes.service.js';

export default {
    template:`
        <section class="add-note">
            <component :is="typeCmp" @input="changeInfo"></component>
            <select v-model="toType">
                <option value="text">Text</option>
                <option value="img">Image</option>
                <option value="todo">Toto</option>
                <option value="video">video</option>
            </select>
            <button @click="addNote">add</button>
        </section>
    `,
    data() {
        return {
            toType: 'text',
            info:null
        }
    },
    methods: {
        addNote(){
            noteService.saveNote(this.info)
        },
        changeInfo(info){
            this.info = info
        }
    },
    computed: {
        typeCmp(){
            switch(this.toType){
                case 'text':return 'addText'
                case 'img':return 'addImg'
                case 'todo':return 'addTodo'
                case 'video':return 'addVideo'
            }
        }
    },
    components:{
        addText,
        addImg,
        addTodo,
        addVideo
    }
}