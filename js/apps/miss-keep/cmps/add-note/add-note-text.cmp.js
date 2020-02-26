export default {
    template:`
    <div class="add-note-img">
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
                txt:''
            }
        }
    },
    created() {
        this.$emit('input',this.info)
    },
}