import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faPlusSquare, faHeart, faClock } from '@fortawesome/free-regular-svg-icons'
import {
  faSearch,
  faCheckDouble,
  faMapMarkerAlt,
  faCircle,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser,
  faPlusSquare,
  faSearch,
  faHeart,
  faCheckDouble,
  faMapMarkerAlt,
  faClock,
  faCircle,
  faAngleRight,
  faAngleLeft,
)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
