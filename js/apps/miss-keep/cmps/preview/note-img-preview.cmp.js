export default {
    template: `
    <div class="note-img-preview">
        <img :src="info.url">
        <h3>{{info.title}}</h3>
        <p>{{info.txt}}</p>
        <button @click="$emit('open')">
            open
        </button>
        <button @click="$emit('remove')">
            remove
        </button>
    </div>
    `,
    props: {
        info: Object
    }
}