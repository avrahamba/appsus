import { bookService } from '../../../services/book.service.js'
import longText from '../cmps/long-text.cmp.js';
import reviewAdd from '../cmps/review-add.cmp.js';
import userReview from '../cmps/user-review.cmp.js';
export default {
    template: `
        <div class="book-details" v-if="book">
            <img :src="book.thumbnail">
            <div class="text-container">
                <div>
                    <router-link :to="prev">Prev</router-link>
                    <router-link to="/books">Up</router-link>
                    <router-link :to="next">Next</router-link>
                </div>
                <h2>{{book.title}}</h2>
                <h3>{{book.subtitle}}</h3>
                <div>
                    {{author}}
                </div>
                <div>
                    {{publishedDate}}
                </div>
                    <long-text :txt="book.description"></long-text>
                <div>
                    {{pageCount}}
                </div>
                <div>
                    {{ctegory}}
                </div>
                <div>
                    Language: {{book.language}} 
                </div>
                <div :class="priceClass">
                    {{price}}
                </div>
                <img v-if="book.listPrice.isOnSale" src="./img/forSale.png"/>
                <div>
                    <users-review :review="review" v-for="(review, inx) in book.reviews" :key="inx"></users-review>
                    <review-add v-if="review" @send="addReview"></review-add>
                    <router-link :to="prev">Prev</router-link>
                    <router-link to="/books">Up</router-link>
                    <router-link :to="next">Next</router-link>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            book:null,
            review:true
        }
    },
    created() { 
       this.createBook();
    },
    methods: {
        createBook(){
            bookService.getBookById(this.$route.params.id)
            .then((book)=>{this.book = book})
        },
        addReview(reviewObj){
            this.review = false;
            bookService.addReview(this.book.id,reviewObj)
                .then((bookReviews)=>this.book.reviews = bookReviews)
        }
    },
    computed: {
        author() {
            return `${(this.book.authors.length > 1) ? 'Authors' : 'Author'} : ${this.book.authors.join(', ')}`
        },
        ctegory() {
            return `${(this.book.categories.length > 1) ? 'Categories' : 'Category'}: ${this.book.categories.join(', ')}`
        },
        price() {
            if(!this.book.listPrice.amount) return 'Not for sale'
            return `Price: ${this.book.listPrice.amount} ${this.book.listPrice.currencyCode}`
        },
        pageCount() {
            let addText = '';
            if (this.book.pageCount > 500) addText = ' - Long reading';
            else if (this.book.pageCount > 200) addText = ' - Decent Reading';
            else if (this.book.pageCount < 100) addText = ' - Light Reading';
            return `Page Count: ${this.book.pageCount}${addText}`
        },
        publishedDate() {
            const years = new Date().getFullYear() - this.book.publishedDate;
            let addText = '';
            if (years > 10) addText = ' - Veteran Book';
            else if (years < 1) addText = ' - New!';
            return `Published Date: ${this.book.publishedDate}${addText}`
        },
        priceClass() {
            if (this.book.listPrice.amount > 150 || !this.book.listPrice.amount) return 'expensive'
            if (this.book.listPrice.amount < 20) return 'cheap'
        },
        prev(){
             return `/books/${this.book.prev}`
        },
        next(){
            return `/books/${this.book.next}`
        }
    },
    watch: {
        '$route'(to,from){
            this.createBook()
        },
    },
    components:{
        longText,
        usersReview: userReview,
        reviewAdd
    }
}