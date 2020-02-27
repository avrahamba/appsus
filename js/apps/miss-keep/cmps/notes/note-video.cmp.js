import {noteService} from '../../../../services/miss-keep/notes.service.js';

export default {
    template: `
    <div ref="note" class="note-video open-note">
        <input 
        type="text" 
        v-if="edit" 
        placeholder = "Please enter a new URL"
        v-model="url"
        >
        <iframe v-else :width="width" :height="height"
            :src="info.url">
        </iframe> 
        <button @click="startEditOrSave" :title="editSave">
        <i class="fa" :class="srcImgEdit"></i>
        </button>
        <button @click="$emit('close')" title="close">
        <i class="fa fa-close"></i>
        </button>
        <button @click="$emit('remove')" title="remove">
        <i class="fa fa-trash"></i>
        </button>
  </div>
    `,
    props:{
        info: Object,
        id:String
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
    data() {
        return {
            width:420,
            height:315,
            edit:false,
            url:''
        }
    },
    mounted() {
        this.width = this.$refs.note.offsetWidth;
        this.height = this.width * 9 / 16; 
    },
    methods: {
        startEditOrSave(){
            if(this.edit){
                noteService.saveNote({id:this.id,url:this.url})
            }
                this.edit =!this.edit
            
        }
    },
}