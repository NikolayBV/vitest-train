import './styles/main.css'

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
    domain: 'dev-0o8qw6l7y84zmrq5.us.auth0.com',
    clientId: '0L8klcg2OjJNYdg4TSHYAGM11h7hLD7y',
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'http://localhost:5174'
    }
  })
)

app.mount('#app')
