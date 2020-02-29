export default {
    template:`
    <nav class="email-menu">
        <router-link to="/mister-email/compose">
            <i class="fa fa-plus"></i>
            Compose
        </router-link>
        <router-link to="/mister-email" exact>
            <i class="fa fa-inbox"></i>
            Inbox
        </router-link>
        <router-link to="/mister-email/starred" exact>
            <i class="fa fa-star"></i>
            Starred
        </router-link>
        <router-link to="/mister-email/deleted" exact>
            <i class="fa fa-trash"></i>
            Deleted Mail
        </router-link>
        <router-link to="/mister-email/sent" exact>
            <i class="fa fa-send"></i>
            Sent Mail
        </router-link>
        <router-link to="/mister-email/drafts" exact>
            <i class="fa fa-edit"></i>
            Drafts
        </router-link>
    </nav>
    `,
}