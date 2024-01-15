import './styles/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createAuth0 } from '@auth0/auth0-vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

app.use(router)

app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_BASE_URL
    }
  })
)

app.mount('#app')
