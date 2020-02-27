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
        cols="31"
        ></textarea>
        <p v-else>
            {{info.txt}}
        </p>
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
    created() {
        this.infoCopy = JSON.parse(JSON.stringify(this.info)) 
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
            }
            this.edit = !this.edit
        }
    },

}