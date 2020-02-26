export default {
    template: `
    <div class="note-video-preview">
        <div ref="video">
            <iframe :width="width" :height="height"
                :src="info.url">
            </iframe> 
        </div>
        <button @click="$emit('open')">
            open
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
        this.width = this.$refs.video.offsetWidth;
        this.height = this.width * 9 / 16; 
    },
}