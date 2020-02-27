export default {
    template:`
    <nav class="email-menu">
        <router-link to="/mister-email/compose" exact>
            Compose
        </router-link>
        <router-link to="/mister-email" exact>
            Inbox
        </router-link>
        <router-link to="/mister-email/deleted" exact>
            Starred
        </router-link>
        <router-link to="/mister-email/0" exact>
            Deleted Mail
        </router-link>
        <router-link to="/mister-email/1" exact>
            Sent Mail
        </router-link>
        <router-link to="/mister-email/2" exact>
            Drafts
        </router-link>

    </nav>
    `,
}