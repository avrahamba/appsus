import {noteService} from '../../../../services/miss-keep/notes.service.js';
export default {
    template: `
    <div class="note-video-preview card" :style="{'background-color': info.color}">
        <div ref="video">
            <iframe :width="width" :height="height"
                :src="info.url">
            </iframe> 
        </div>
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
            <button @click.stop="pin" title="pin">
                <i class="fa fa-map-pin"></i>
            </button>
            <button @click.stop="$emit('remove')" title="remove">
                <i class="fa fa-trash"></i>
            </button>
        </div>
    </div>
    `,
    props:{
        info: Object,
        id: String
    },
    data() {
        return {
            width:420,
            height:315,
            colorOpen:false
        }
    },
    mounted() {
        this.width = this.$refs.video.offsetWidth;
        this.height = this.width * 9 / 16; 
    },
    methods: {
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