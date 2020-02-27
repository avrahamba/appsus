import emailStatus from './email-status.cmp.js';
export default {
    template:`
    <section class="email-menu">
    <router-link to="/mister-email/compose">
        Compose +
    </router-link>
        <email-status></email-status>

    </section>
    `,
    components:{
        emailStatus
    }
}