export default {
    template:`
        <div class="button-add">
            <span>{{txt}}</span>
            <span class="plus" @click="add">+</span>
        </div>
    `,
    props:{
        txt: String
    },
    methods: {
        add(){
            this.$emit('add')
        }
    },

}