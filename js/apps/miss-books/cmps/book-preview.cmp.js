export default {
    template: `
        <div class="book-preview">
            <h3>{{book.title}}</h3>
            <img :src="book.thumbnail" />
            <div :class="classPrice">{{txtPrice}}</div>
        </div>
    `,
    props: ['book'],
    computed: {
        classPrice() {
            if (this.book.listPrice.amount > 150 || !this.book.listPrice.amount) return 'expensive';
            if (this.book.listPrice.amount < 20) return 'cheap';
        },
        txtPrice(){
            if(this.book.listPrice.amount)return `${this.book.listPrice.amount} ${this.book.listPrice.currencyCode}`
            return 'Not for sale'
        }
    },
}