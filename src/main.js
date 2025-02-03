import './assets/main.css'

import { createApp, ref } from 'vue'
import VueCookies from 'vue-cookies'

import App from './App.vue'
import router from './router'

//-----icons------------------
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
  faCamera,
  faCheck,
  faArrowLeft,
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
  faArrowLeft,
  faSignOutAlt,
  faEyeSlash,
  faEye,
  faCamera,
  faCheck,
)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

//-----cookies--------------------
app.use(VueCookies)

// -----provider----------------
const connectedUser = ref(VueCookies.get('userInfos') || [])

const changeToken = (userInfos) => {
  connectedUser.value.push(userInfos)
  // console.log(connectedUser.value)
}

app.provide('GlobalStore', {
  connectedUser,
  changeToken,
})

app.mount('#app')
