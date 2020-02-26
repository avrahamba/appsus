export default {
    template: `
        <div class="long-text">
            <template v-if="close">
                {{abbreviatedText}} <button @click="open" v-if="txt.length>100">Read more</button>
            </template>
            <template v-else>
                {{txt}}
            </template>
        </div>
    `,
    props: ['txt'],
    data() {
        return {
            close:true
        }
    },
    computed: {
        abbreviatedText(){
            if(this.txt.length>100)return this.txt.substr(0,100)+'...'
            return this.txt;
        }
    },
    watch: {
        txt(){
            this.close=true
        }
    },
    methods: {
        open(){
            this.close=false
        }
    }, 
}