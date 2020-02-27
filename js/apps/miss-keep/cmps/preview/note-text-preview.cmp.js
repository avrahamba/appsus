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
            <i class="fa fa-trash"></i>
        </button>
    </div>
    `,
    props:{
        info: Object
    }
}