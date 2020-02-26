import {noteService} from '../../../../services/miss-keep/notes.service.js';


export default {
    template: `
    <div class="note-text open-note">
        <input 
            type="text" 
            v-if="edit" 
            placeholder = "Edit the title"
            v-model="infoCopy.title"
            >
        <h3 v-else>{{info.title}}</h3>
        <textarea 
        v-if="edit"
        placeholder="Edit the text"
        v-model="infoCopy.txt" 
        ></textarea>
        <p v-else>
            {{info.txt}}
        </p>
        <button class="edit" @click="startEditOrSave">
            {{txtEdit}}
        </button>
        <button class="close" @click="$emit('close')">
            Close
        </button>
        <button class="remove" @click="$emit('remove')">
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
        }
    },

}