export default {
    template: `
    <div class="note-todos">
        <ul>
            <li v-for="(todo, inx) in info.todoList" :key="inx">
                {{todo.txt}}
            </li>
        </ul>
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