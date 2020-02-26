export default {
    template:`
    <div class="add-note-text">
    <input type="text"
        v-model="info.title" 
        placeholder="Pleas enter title"
        @input="$emit('input',info)"
    >
        <textarea 
        v-model="info.txt" 
        placeholder="Pleas enter text"
        @input="$emit('input',info)"></textarea>
    </div>
    `,
    data() {
        return {
            info:{
                type:'txt',
                title:'',
                txt:'',
            }
        }
    },
    created() {
        this.$emit('input',this.info)
    },
    
}