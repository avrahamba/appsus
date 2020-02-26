import starRate from './star-rate.cmp.js';
import {eventBus} from '../../../services/event-bus.service.js';
import {EVENT_SHOW_MSG} from '../../../services/event-bus.service.js';

export default {
    template:`
    <div class="review-add">
        <form @submit.prevent="send()">
            <p>
                <label>
                    Full Name: <input type="text" v-model="review.fullName">
                </label>
            </p>
            <p>
                <label>
                    Rate: <star-rate @setStar="setStar" :live="true" :rate="review.rate"></star-rate>
                </label>
            </p>
            <p>
                <label>
                    Datepicker: <input type="date" v-model="review.datepicker">
                </label>
            </p>
            <p>
                <label>
                    Free text: <br /> <textarea cols="30" rows="10" v-model="review.freeText"></textarea>
                </label>
            </p>
            <button>Send</button>

        </form>
    </div>
    `,
    data() {
        return {
            review:{
                fullName:'Books Reader',
                rate:0,
                datepicker:'',
                freeText:''
            }
        }
    },
    created() {
        const date = new Date();
        let month = date.getMonth()
        if(month < 10) month = '0' + month;
        let dateDay = date.getDate()
        if(dateDay < 10) dateDay = '0' + dateDay;
        this.review.datepicker = `${date.getFullYear()}-${month}-${dateDay}`
    },
    methods: {
        setStar(inx){
            this.review.rate = inx
        },
        send(){
            eventBus.$emit(EVENT_SHOW_MSG,'The review is update in secss')
            this.$emit('send',this.review)
        }
    },
    components:{
        starRate
    }
}