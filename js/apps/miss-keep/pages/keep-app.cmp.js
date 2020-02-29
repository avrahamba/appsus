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
    <div class="cards-container pined">
        <component 
        v-if="notes"
        v-for="(note, inx) in notesPreviewPined" 
        :key="inx" 
        :is="note.type" 
        :info="note.info"
        :id="note.id"
        @remove="removeNote(note.id)"
        @click.native="openNote(note.id)"
        ></component>
    </div>
    <div class="cards-container Unpined">
        <component 
        v-if="notes"
        v-for="(note, inx) in notesPreviewUnpined"
        :key="inx" 
        :is="note.type" 
        :info="note.info"
        :id="note.id"
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
        notesPreviewPined(){
            if(!this.notes)return[]
            return this.notes
            .map(
            (note)=>{
                let newNote = JSON.parse(JSON.stringify(note))
                newNote.type += 'Preview'; 
                return newNote
            }).filter(note=>note.info.pined)
        },
        notesPreviewUnpined(){
            if(!this.notes)return[]
            return this.notes
            .map(
            (note)=>{
                let newNote = JSON.parse(JSON.stringify(note))
                newNote.type += 'Preview'; 
                return newNote
            }).filter(note=>!note.info.pined)
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