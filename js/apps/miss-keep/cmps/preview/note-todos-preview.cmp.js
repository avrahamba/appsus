export default {
    template: `
    <div class="note-todos-preview">
        <ul>
            <li v-for="(todo, inx) in info.todoList" :key="inx">
                {{todo.txt}}
            </li>
        </ul>
        <button @click="$emit('open')">
            open
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