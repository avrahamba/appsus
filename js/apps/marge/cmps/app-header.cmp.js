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
                {to:'/books',text:'Miss Books'},
                {to:'/miss-keep',text:'Miss Keep'},
                {to:'/mister-email',text:'Mister Email'},
            ]
        }
    },
}