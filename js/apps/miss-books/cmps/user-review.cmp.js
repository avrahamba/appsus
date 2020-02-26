import starRate from './star-rate.cmp.js';

export default {
    template:`
    <div class="user-review">
        <p>
            {{review.freeText}}
        </p>
        <p>
            {{date}}
        </p>
        <p>
            reviewer: {{review.fullName}}
        </p>
        <p><star-rate :live="false" :rate="review.rate"></star-rate></p>
    </div>
    `,
    props:{
        review:Object
    },
    computed: {
        date(){
            const datepicker = new Date(this.review.datepicker)
            return `Date picker: ${datepicker.getDate()}:${datepicker.getMonth()}:${datepicker.getFullYear()}`;
        }
    },
    components:{
        starRate
    }
}