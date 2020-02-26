export default {
    template: `
    <div class="note-text-preview card">
        <div class="text-container">
            <h3>{{info.title}}</h3>
            <p>
                {{info.txt}}
            </p>
        </div>
        <button @click.stop="$emit('remove')" title="remove">
            ✕
        </button>
    </div>
    `,
    props:{
        info: Object
    }
}