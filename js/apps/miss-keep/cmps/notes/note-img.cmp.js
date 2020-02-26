export default {
    template: `
    <div class="note-img">
        <img :src="info.url">
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
    }
}