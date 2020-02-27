import {eventBus, EVENT_CHANGE_FILTER_EMAIL} from '../../../services/event-bus.service.js';
import emailStatus from './email-status.cmp.js';

export default {
    template:`
    <section class="email-filter">
    <email-status></email-status>
    <div class="filter-container">
        <input type="text" v-model="filterBy.txt" placeholder="Search">
        <select v-model="filterBy.isReaded">
            <option value="all">All</option>
            <option value="unreaded">Unread</option>
            <option value="readed">Read</option>
        </select>
    </div>
    </section>
    `,
    data() {
        return {
            filterBy:{
                isReaded: 'all',
                txt:''
            }
        }
    },
    watch: {
        filterBy: {
            handler(newVal) {
                 eventBus.$emit(EVENT_CHANGE_FILTER_EMAIL,newVal)
            },
            deep: true
        } 
    },
    components:{
        emailStatus
    }
}