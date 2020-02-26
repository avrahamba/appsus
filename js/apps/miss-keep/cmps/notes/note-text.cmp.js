export default {
    template: `
    <div class="note-text">
        <p>
            {{info.txt}}
        </p>
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