export default {
    template:`
    <nav class="app-header">
        
        <router-link class="logo" to="/" exact>
        <img src="./img/LOGO.png">
        APPSUS
        </router-link>
        <!-- <div class="logo">APPSUS</div> -->
        <ul>
            <li v-for="(link, index) in links" :key="index">
                <router-link class="router-link" :to="link.to">{{link.text}}</router-link>
            </li>
        </ul>
    </nav>
    `,
    data() {
        return {
            links:[
                {to:'/books',text:'Books'},
                {to:'/miss-keep',text:'Keep App'},
                {to:'/mister-email',text:'Email App'},
            ]
        }
    },
}