import {bookService} from '../../../services/book.service.js';
import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'


export default {
    template:`
    <div class="boo-show">
        <book-filter :filterBy="filter"></book-filter>
        <book-list :books="booksToShow" @selected="selectBook"></book-list>
    </div>
    `
    ,
    data() {
        return {
            books: null,
            filter: {
                text: '',
                price: '',
                length: ''
            },

        }
    },
    computed: {
        booksToShow() {
            
            let booksFiltered = this.books;
            if (this.filter.text) {
                booksFiltered = booksFiltered.filter((book) => {
                    return (book.title.includes(this.filter.text) ||
                        book.authors.includes(this.filter.text ||
                            book.categories.join().includes(this.filter.text)))
                })
            }

            if (this.filter.price) {
                booksFiltered = booksFiltered.filter((book) => {
                    return ((this.filter.price === 'expensive' && book.listPrice.amount > 150) ||
                        (this.filter.price === 'inexpensive' && (book.listPrice.amount <= 150 && book.listPrice.amount >= 20)) ||
                        (this.filter.price === 'cheap' && book.listPrice.amount < 20))
                })
            } if (this.filter.text) {
                booksFiltered = booksFiltered.filter((book) => {
                    return (book.title.includes(this.filter.text) ||
                        book.authors.includes(this.filter.text ||
                            book.categories.join().includes(this.filter.text)))
                })
            }

            if (this.filter.price) {
                booksFiltered = booksFiltered.filter((book) => {
                    return ((this.filter.price === 'expensive' && book.listPrice.amount > 150) ||
                        (this.filter.price === 'inexpensive' && (book.listPrice.amount <= 150 && book.listPrice.amount >= 20)) ||
                        (this.filter.price === 'cheap' && book.listPrice.amount < 20))
                })
            }
            if (this.filter.length) {
                booksFiltered = booksFiltered.filter((book) => {
                    return ((this.filter.length === 'long' && book.pageCount > 500) ||
                        (this.filter.length === 'decent' && book.pageCount > 100) ||
                        (this.filter.length === 'light' && book.pageCount < 100))
                })
            }

            return booksFiltered;
        },
    },
    components:{
        bookFilter,
        bookList
    },
    created() {
        bookService.query()
        .then((books)=>{
            this.books = books;
        })
    },
    methods: {
        selectBook(bookId) {
            this.selectedBook = this.books.find((book) => book.id === bookId)
            this.isDetailsOpen = true;
        },

    },
}