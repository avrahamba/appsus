export default {
    template:`
    <nav class="app-header" @click="closeBar">
        
        <div class="bars" @click.stop="openBar">
            <i class="fa fa-bars"></i>
        </div>
        <router-link class="logo" to="/" exact>
            <img src="./img/LOGO.png">
            <h1>APPSUS</h1> 
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
    methods: {
        openBar(){
            document.body.classList.toggle('open-bar')
        },
        closeBar(){
            document.body.classList.remove('open-bar')
        }
    },
}