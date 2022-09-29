<template id="app-frame">
    <v-app>
        <!-- Navigation Drawer -->
        <v-navigation-drawer v-model="drawer" color="blue-grey darken-4" dark app>
            <v-list>
                <v-list-item class="px-2">
                    <v-list-item-avatar>
                        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>Super User</v-list-item-title>
                        <v-list-item-subtitle>sysadmin</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list nav dense>
                <v-list-item v-for="(mnu, i) in menu" :key="i" :href="mnu.href">
                    <v-list-item-icon>
                        <v-icon>{{ mnu.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ mnu.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!-- Top Tool Bar -->
        <v-app-bar dense color="blue darken-3" dark app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Kotlin/Javalin/Vue/Vuefity</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="signOut">
                <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>
        <!-- Main -->
        <v-main class="grey lighten-3">
            <v-container fluid>
                <slot></slot>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
Vue.component("app-frame", {
    template: "#app-frame",
    data: () => ({
        drawer: null,
        menu: [
            { title: 'Inicio', icon: 'mdi-home', href: '/' },
            { title: 'Crud', icon: 'mdi-tablet-android', href: '/crud' },
            { title: 'Misc', icon: 'mdi-truck-fast', href: '/misc' },
            { title: 'Grouping', icon: 'mdi-dots-grid', href: '/grouping' },
            { title: 'Search', icon: 'mdi-account-cog', href: '/search' }
        ],

    }),

    methods: {
        // 
        signOut() {
            // this.$swalConfirm('¿Desea Salir?', 'warning')
            // .then(result => {
            //     if (result.isConfirmed) {
            //         this.$fetch("/api/sign-out", { method: 'POST' })
            //         .then(result => window.location ='/')
            //         .catch(err => this.$toast.fire({ icon: 'error', title: err }))
            //     }
            // })
        }
    }
})
</script>