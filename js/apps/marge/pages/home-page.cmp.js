export default {
    template:`
    <div class="home-page">
        <h1>APPSUS</h1>
        <section class="links">

            <router-link 
                v-for="(category, inx) in categories" 
                :key="inx" 
                class="router-link" 
                :to="category.to">
                <img :src="category.src">
                <h2>{{category.h2}}</h2>
                <p>{{category.p}}</p>
            </router-link>
        </section>
    </div>
    `,
    data() {
        return {
            categories:[
                {to:'/miss-keep', src:'./img/idea.png', h2: 'Miss keep', p: 'Save your notes'},
                {to:'/mister-email', src:'./img/mail.png', h2: 'Mister Email', p: 'Send and read you email'},
                {to:'/books', src:'./img/Books.png', h2: 'Miss Books', p: 'Save your library'},
            ]
        }
    },
}