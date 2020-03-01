import {noteService} from '../../../../services/miss-keep/notes.service.js';

export default {
    template: `
    <div ref="note" class="note-video open-note" :style="{'background-color': info.color}">
        <input 
        type="text" 
        v-if="edit" 
        placeholder = "Please enter a new URL"
        v-model="url"
        >
        <iframe v-else :width="width" :height="height"
            :src="info.url">
        </iframe> 
        <div class="btns">

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
            <button @click="startEditOrSave" :title="editSave">
            <i class="fa" :class="srcImgEdit"></i>
            </button>
            <button @click="$emit('close')" title="close">
            <i class="fa fa-close"></i>
            </button>
            <button @click.stop="pin" title="pin">
                    <i class="fa fa-map-pin"></i>
            </button>
            <button @click="$emit('remove')" title="remove">
            <i class="fa fa-trash"></i>
            </button>
        </div>
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
            url:'',
            colorOpen:false
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
            
        },
        colorSet(color){
            if(typeof color === 'string'){
                noteService.setColor(this.id, color)
            }
            this.colorOpen = !this.colorOpen
        },
        pin(){
            noteService.setPin(this.id)
        }
    },
    created() {
        document.body.classList.add('open-modal')
    },
    destroyed() {
        document.body.classList.remove('open-modal')
    },
}