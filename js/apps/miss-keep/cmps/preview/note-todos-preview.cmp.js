import {noteService} from '../../../../services/miss-keep/notes.service.js';
export default {
    template: `
    <div class="note-todos-preview card" :style="{'background-color': info.color}">
        <ul>
            <li v-for="(todo, inx) in info.todoList" :class="{'todo-doed':todo.do}" :key="inx">
                {{todo.txt}}
            </li>
        </ul>
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
                <i class="fa fa-map-pin" :style="{color: info.pined?'red':''}"></i>
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
            colorOpen:false
        }
    },
    methods: {
        colorSet(color){
            if(typeof color === 'string'){
                noteService.setColor(this.id, color)
            }
            this.colorOpen = !this.colorOpen
        },
        pin(){
            if(!this.info.pined){
                window.scroll({
                    top: 100,
                    left: 100,
                    behavior: 'smooth'
                });
            }
            noteService.setPin(this.id)
        }
    },
}