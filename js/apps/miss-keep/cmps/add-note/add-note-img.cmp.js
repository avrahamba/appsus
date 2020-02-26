
export default {
    template:`
    <div class="add-note-img">
        <input 
        type="text" 
        v-model="info.url" 
        @input="$emit('input',info)"
        placeholder="Pleas enter URL for image"
        >
    </div>
    `,
    data() {
        return {
            info:{
                type:'img',
                url:''
            }
        }
    },
    created() {
        this.$emit('input',this.info)
    },
}