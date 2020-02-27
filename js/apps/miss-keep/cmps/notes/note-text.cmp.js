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
        <img :src="srcImgEdit">
        </button>
        <button class="close" @click="$emit('close')">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAABL0lEQVRIib3UzSqEURgH8J+PnZQSKYoNiUhZkZJsuAE7N6BwB9ZyI5ZspNwASpGykKzIhmSGIh+NxXhrHDPjYI5/Pb31vOecX+ft6eUf84xCSTWlQOpxH/Q6UkGX/wWdBr2xVNBu0JtJAcGQz8PwhPZU2EmAraaClgPoHm0poGbcBNgm6moFNHw8n/GI2ZJ3/bjFfq2wLI0fh5be6gXzEXuPsY3WWKwPdwH2hqVv9mVrzzEci80q3qQQ1Ba6voEKyGMiFpurgOWwhp4qUDa1k7HYjK+fMatX7GAF0xXWPGA0FuvFXoWDYuoK3bFYIxZw/UvsIBbK0oRFxVH+CRT+tH+UAcWRX8dhFeQCnX+BwpRD8hipJVIOesBUrZEQymE8BVIKnWEwFQJH2EBLSiQq710um3CFvh0dAAAAAElFTkSuQmCC">
        </button>
        <button class="remove" @click="$emit('remove')">
            ✕
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
            if(this.edit) return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACR0lEQVRoge2ZP0scQRiHH0SuswkIwTL4BQK5JiR9BLl8BFs/xhWSi6SzsdEmTdKLYGGuMb1gYbA99YoEkkrQQk2xszg7N3925nZmZ8EfDMvu75153+d2ZmfZg2flqx6wDUyBxwzaKfAyBORzBsWr7VcIzLXo/Nbgl4PHVJljGTgjEMZVaEoQqMJcACshg4T4dTWmOn1OLDmC7kwqEN1asOXwvjOpQXRjmnJ4weQMAh4wuYNATZgugEAV5tSVIMSvq3lBoIAxxnYJZCZ2oYHCslCbII2+JbQB8lM5P9FGufUCeKczcnvX8lLX1kgfOAB+A5fAN+CVGuT6NSZSTMw2MeRfB2418X9UGBfIhwQwE5FH1QC4s/T77gPSlmSIXYoppYL8kzvkCCJDjMS1VWZhbuROuYHoIEqpMEeymROIDaLUrvBvgTeykQtIHYiR8O8onmYVuUCWgD2KhdX002oYCDHQBbhA9iMANA5RB+Sv8F9bYkIVCjHUBbpAYq2hNZ527C+GmC2eID6Ka0NTPW2AhEJY60kNMg+EtZ6UIPNCWOtJBdIEhLWeFCBNQVjriQ3Sp6F9wlVPbJAd0f/Q4NfeJ1z1xAY5F/0fgE3F89onXPXEBFmR+qsw3vuEy48JskEV5BG4p5hmpjWRJchXZkHK5r1PuHzVcJ376IpZgHOKB0C/ZqHW88XAwnx1IY5j4AdwTPEvchS19fYbmq/id+1Lo1EyyFQctR+GM9N7cdROz3Jn7VL7pAPpCZhrz8HaaFcCoqcDeVYO+g/WpZWrn7tSfAAAAABJRU5ErkJggg=='
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAArklEQVRIie2RMQ6DMAxFH6UTB+jeU7Jm5B5dWnEGVMG1GMxQUKlRSFyBEIgvZfhW5Gf7w6mAEuVl6b6XhRp6tX/A1VPX2cRqkuFxTzRoWDlRXst70s030JOZw988ZOH37tprvULAUEOfL3qfAg8LIHYgAVxfm83VCsgVpJj/bgeYIWJ4Jd9zREMsAAGeI4gb1d9AFl7erhxogBtQEZHJP8r4bCCAS1cAtMAdqAHXAY1zSiGdbr9PAAAAAElFTkSuQmCC'
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