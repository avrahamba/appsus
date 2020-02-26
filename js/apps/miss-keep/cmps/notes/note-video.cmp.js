export default {
    template: `
    <div ref="note" class="note-video">
        <iframe :width="width" :height="height"
            :src="info.url">
        </iframe> 
        <button>
            edit
        </button>
        <button @click="$emit('remove')">
            remove
        </button>
  </div>
    `,
    props:{
        info: Object
    },
    data() {
        return {
            width:420,
            height:315
        }
    },
    mounted() {
        this.width = this.$refs.note.offsetWidth;
        this.height = this.width * 9 / 16; 
    },
}