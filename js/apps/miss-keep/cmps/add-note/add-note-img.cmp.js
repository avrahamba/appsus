
export default {
    template:`
    <div class="add-note-img">
        <input 
        type="text" 
        v-model="info.url" 
        @input="$emit('input',info)"
        placeholder="Please enter URL for image"
        >
        <input 
        type="text" 
        v-model="info.title" 
        placeholder="Please enter title"
        @input="$emit('input',info)"
        >
        <textarea 
        v-model="info.txt" 
        placeholder="Please enter text"
        @input="$emit('input',info)"></textarea>
        
    </div>
    `,
    data() {
        return {
            info:{
                type:'img',
                url:'',
                title:'',
                text:''
            }
        }
    },
    created() {
        this.$emit('input',this.info)
    },
}