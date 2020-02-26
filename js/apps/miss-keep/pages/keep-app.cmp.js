import {noteService} from '../../../services/miss-keep/notes.service.js';
import noteText from '../cmps/notes/note-text.cmp.js';
import noteImg from '../cmps/notes/note-img.cmp.js';
import noteTodos from '../cmps/notes/note-todos.cmp.js';
import noteVideo from '../cmps/notes/note-video.cmp.js';
import noteTextPreview from '../cmps/preview/note-text-preview.cmp.js';
import noteImgPreview from '../cmps/preview/note-img-preview.cmp.js';
import noteTodosPreview from '../cmps/preview/note-todos-preview.cmp.js';
import noteVideoPreview from '../cmps/preview/note-video-preview.cmp.js';
import addNote from '../cmps/add-note/add-note.cmp.js';
export default {
    template: `
    <section class="keep-app">
        <div class="add-note-container">
            <add-note></add-note>
        </div>
    <hr>
    <div class="cards-container">
        <component 
        v-if="notes"
        v-for="(note, inx) in notesPreview" 
        :key="inx" 
        :is="note.type" 
        :info="note.info"
        @remove="removeNote(note.id)"
        @click.native="openNote(note.id)"
        ></component>
    </div>
        <component 
        v-if="activeNote"
        :is="activeNote.type" 
        :info="activeNote.info"
        :id="activeNote.id"
        @remove="removeActiveNote(activeNote.id)"
        @close="closeActiveNote"
        ></component>
    </section>
    `,
    data() {
        return {
            notes: null,
            activeNote: null
        }
    },
    created() {
        noteService.getNotes()
        .then(notes=>this.notes=notes)
        
    },
    methods: {
        removeNote(noteId){
            noteService.removeNote(noteId)
        },
        openNote(id){
            noteService.getNoteById(id)
                .then((note)=>this.activeNote = note)
        },
        closeActiveNote(){
            this.activeNote=null
        },
        removeActiveNote(id){
            this.activeNote = null
            this.removeNote(id);

        }
    },
    computed: {
        notesPreview(){
            if(!this.notes)return[]
            return this.notes
            .map(
            (note)=>{
                let newNote = JSON.parse(JSON.stringify(note))
                newNote.type += 'Preview'; 
                return newNote
            })
        }
    },
    components:{
        noteText,
        noteImg,
        noteTodos,
        noteVideo,
        noteTextPreview,
        noteImgPreview,
        noteTodosPreview,
        noteVideoPreview,
        addNote
    }
}