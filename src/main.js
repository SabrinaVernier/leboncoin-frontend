import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUser,
  faPlusSquare,
  faHeart,
  faClock,
  faEyeSlash,
  faEye,
} from '@fortawesome/free-regular-svg-icons'
import {
  faSearch,
  faCheckDouble,
  faMapMarkerAlt,
  faCircle,
  faAngleRight,
  faAngleLeft,
  faArrowRight,
  faSignOutAlt,
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
  faArrowRight,
  faSignOutAlt,
  faEyeSlash,
  faEye,
)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

const connectedUser = ref([])
const changeToken = (userInfos) => {
  connectedUser.value.push(userInfos)
}

app.provide('GlobalStore', { connectedUser: connectedUser, changeToken: changeToken })

app.mount('#app')
