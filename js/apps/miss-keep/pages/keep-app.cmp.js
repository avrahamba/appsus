import {noteService} from '../../../services/miss-keep/notes.service.js';
import noteText from '../cmps/notes/note-text.cmp.js';
import noteImg from '../cmps/notes/note-img.cmp.js';
import noteTodos from '../cmps/notes/note-todos.cmp.js';
import noteVideo from '../cmps/notes/note-video.cmp.js';
import addNote from '../cmps/add-note/add-note.cmp.js';
export default {
    template: `
    <section class="keep-app">
    <add-note></add-note>
    <hr>
        <component 
        v-if="notes"
        v-for="(note, inx) in notes" 
        :key="inx" 
        :is="note.type" 
        :info="note.info"
        @remove="removeNote(note.id)"
        ></component>
    </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    created() {
        noteService.getNotes()
        .then(notes=>this.notes=notes)
        
    },
    methods: {
        removeNote(noteId){
            noteService.removeNote(noteId)
        }
    },
    components:{
        noteText,
        noteImg,
        noteTodos,
        noteVideo,
        addNote
    }
}