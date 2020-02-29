export default {
    template:`
    <nav class="email-menu">
        <router-link to="/mister-email/compose">
            <i class="fa fa-plus"></i>
            <div class="txt">
                Compose
            </div>
        </router-link>
        <router-link to="/mister-email" exact>
            <i class="fa fa-inbox"></i>
            <div class="txt">Inbox</div>
        </router-link>
        <router-link to="/mister-email/starred" exact>
            <i class="fa fa-star"></i>
            <div class="txt">Starred</div>
        </router-link>
        <router-link to="/mister-email/deleted" exact>
            <i class="fa fa-trash"></i>
            <div class="txt">Deleted Mail</div>
        </router-link>
        <router-link to="/mister-email/sent" exact>
            <i class="fa fa-send"></i>
            <div class="txt">Sent Mail</div>
        </router-link>
        <router-link to="/mister-email/drafts" exact>
            <i class="fa fa-edit"></i>
            <div class="txt">Drafts</div>
        </router-link>
    </nav>
    `,
}