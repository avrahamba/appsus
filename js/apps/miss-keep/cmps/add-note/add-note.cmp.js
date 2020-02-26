import addText from './add-note-text.cmp.js';
import addImg from './add-note-img.cmp.js';
import addTodo from './add-note-todo.cmp.js';
import addVideo from './add-note-video.cmp.js';
import {noteService} from '../../../../services/miss-keep/notes.service.js';
import {eventBus, EVENT_CLEAR} from '../../../../services/event-bus.service.js';

export default {
    template:`
        <section class="add-note">
            <button class="link" @click="addNote">➕</button>
            <component :is="typeCmp" @input="changeInfo"></component>
            <span class="link" @click="toType = 'text'">
                <img src="https://img.icons8.com/ios/24/000000/text.png">
            </span>
            <span class="link" @click="toType = 'todo'">
                <img src="https://img.icons8.com/material-sharp/24/000000/todo-list--v1.png">
            </span>
            <span class="link" @click="toType = 'video'">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="24" height="24"
                viewBox="0 0 172 172"
                style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#e74c3c"><path d="M86,22.93333c-23.99973,0 -55.14974,6.01328 -55.14974,6.01328l-0.07839,0.08958c-10.93074,1.74816 -19.30521,11.14085 -19.30521,22.5638v34.4v0.0112v34.3888v0.0112c0.02203,11.26967 8.22905,20.85323 19.3612,22.60859l0.0224,0.0336c0,0 31.15001,6.02448 55.14974,6.02448c23.99973,0 55.14974,-6.02448 55.14974,-6.02448l0.0112,-0.0112c11.14496,-1.75176 19.36049,-11.34921 19.37239,-22.63099v-0.0112v-34.3888v-0.0112v-34.4c-0.01654,-11.27391 -8.22487,-20.86376 -19.3612,-22.61979l-0.02239,-0.03359c0,0 -31.15001,-6.01328 -55.14974,-6.01328zM68.8,59.61771l45.86667,26.38229l-45.86667,26.38229z"></path></g></g></svg>
            </span>
            <span class="link" @click="toType = 'img'">
                <img src="https://img.icons8.com/material-outlined/24/000000/add-image.png">
            </span>
        </section>
    `,
    data() {
        return {
            toType: 'text',
            info:null,
        }
    },
    methods: {
        addNote(){
            noteService.saveNote(this.info)
            eventBus.$emit(EVENT_CLEAR)
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