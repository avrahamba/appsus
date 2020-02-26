export default {
    template: `
    <div class="note-img-preview card">
        <div class="text-contianer">
            <img :src="info.url">
            <h3>{{info.title}}</h3>
            <p>{{info.txt}}</p>
        </div>
        <button @click.stop="$emit('remove')" title="remove">
            ✕
        </button>
    </div>
    `,
    props: {
        info: Object
    }
}