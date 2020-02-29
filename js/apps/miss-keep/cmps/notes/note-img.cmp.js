import {noteService} from '../../../../services/miss-keep/notes.service.js';

export default {
    template: `
    <div class="note-img open-note" :style="{'background-color': info.color}">

        <input type="text"
        placeholder = "Edit the URL of image"
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
        <h3 v-else>{{info.title}}</h3>
        <textarea 
        v-if="edit"
        placeholder="Edit the text"
        v-model="infoCopy.txt" 
        cols="31"
        ></textarea>

        <p v-else>{{info.txt}}</p>
        <div class="color-btns">

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
        </div>
    <div class="btns">

        <button class="edit" @click="startEditOrSave" :title="editSave">
            <i class="fa" :class="srcImgEdit"></i>
        </button>
        <button class="close" @click="$emit('close')" title="close">
            <i class="fa fa-close"></i>
        </button>
        <button @click.stop="pin" title="pin">
            <i class="fa fa-map-pin"></i>
        </button>
        <button class="remove" @click="$emit('remove')" title="remove">
            <i class="fa fa-trash"></i>
        </button>
    </div>
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
            edit:false,
            colorOpen:false
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
                this.infoCopy.url = this.url
                noteService.saveNote({id:this.id,info:this.infoCopy})
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
}