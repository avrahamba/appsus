export default {
    template:`
    <div class="add-note-todo">
    <ul>
        <li v-for="(todo, inx) in info.todos" :key="inx">
            <input 
            type="text" 
            v-model="info.todos[inx]"
            @input="$emit('input',info)"
            placeholder="Add todo"
            >
        </li>
    </ul>
        <button @click="add">add</button>
    </div>
    `,
    data() {
        return {
            info:{
                type:'todo',
                todos:[
                    ''
                ]
            }
        }
    },
    methods: {
        add(){
            this.info.todos.push('');
        }
    },
}