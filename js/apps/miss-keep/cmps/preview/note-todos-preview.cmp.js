export default {
    template: `
    <div class="note-todos-preview card">
        <ul>
            <li v-for="(todo, inx) in info.todoList" :class="{'todo-doed':todo.do}" :key="inx">
                {{todo.txt}}
            </li>
        </ul>
            <button @click.stop="$emit('remove')" title="remove">
                ✕
            </button>
  </div>
    `,
    props:{
        info: Object
    }
}