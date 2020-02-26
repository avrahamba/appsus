import {googleBook} from '../../../services/google-books.service.js';
import {bookService} from '../../../services/book.service.js';
import {eventBus} from '../../../services/event-bus.service.js';
import {EVENT_SHOW_MSG} from '../../../services/event-bus.service.js';
import buttonAdd from '../cmps/button-add.cmp.js'

export default {
    template:`
        <section class="book-add">
            <input type="text" @change="inputTxt" v-model="txt" placeholder="Search for a book">
            <button-add v-if="opts" v-for="(opt, index) in opts" :key="index" :txt="opt.title" @add="addBook(opt)"></button-add>
        </section>
    `,
    data() {
        return {
            txt:'',
            opts: null
        }
    },methods: {
        inputTxt(){   
            if(!this.txt){
                this.opts =null;
                return;
            }         
            googleBook.getbooksSearch(this.txt)
                .then(data=>{
                    this.opts = data
                })
        },
        addBook(book){
            bookService.addBook(book)
                .then(()=>{
                    eventBus.$emit(EVENT_SHOW_MSG,'The book added in secss')
                    this.$router.push('/books/'+book.id)
                })
        }
    },
    components:{
        buttonAdd
    },
}