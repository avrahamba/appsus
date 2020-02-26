import {noteService} from '../../../../services/miss-keep/notes.service.js';

export default {
    template: `
    <div class="note-img">

        <input type="text"
        v-model="url"
        v-if="edit"
        >
        <img v-else :src="info.url">
        <input 
            type="text" 
            v-if="edit" 
            placeholder = "Edit the title"
            v-model="infoCopy.title"
            >
        <h3>{{info.title}}</h3>
        <textarea 
        v-if="edit"
        placeholder="Edit the text"
        v-model="infoCopy.txt" 
        ></textarea>

        <p>{{info.txt}}</p>

        
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
    props: {
        info: Object,
        id:String
    },
    data() {
        return {
            infoCopy:null,
            url:'',
            edit:false
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
                this.infoCopy.url = this.url
                noteService.saveNote({id:this.id,info:this.infoCopy})
            }
            this.edit =!this.edit
        }
    },
}