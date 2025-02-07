<!-- eslint-disable no-undef -->
<script setup>
import { ref, inject } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'

import axios from 'axios'

const contentButton = ref("S'inscrire")

const username = ref('')
const email = ref('')
const password = ref('')

const errorMessage = ref('')

const globalStore = inject('GlobalStore')

const router = useRouter()
const route = useRoute()

// bonus1--------
const visiblePassword = ref(false)

// bonus2--------
const clearErrorMessage = () => {
  errorMessage.value = ''
}

const userSignup = async () => {
  errorMessage.value = ''
  console.log('submit')
  if (username.value && email.value && password.value) {
    contentButton.value = 'Inscription en cours...'
    try {
      const { data } = await axios.post(`http://localhost:1337/api/auth/local/register`, {
        email: email.value,
        username: username.value,
        password: password.value,
      })
      globalStore.changeToken({ username: data.user.username, jwt: data.jwt, id: data.user.id })

      $cookies.set('userInfos', globalStore.connectedUser.value)

      contentButton.value = 'Inscription effectuée'
      router.push({ path: route.query.redirect || '/' })
    } catch (error) {
      contentButton.value = "S'inscrire"
      errorMessage.value =
        '"Name or email has already taken" Un problème est survenu, veuillez essayer à nouveau'
      console.log('SignupView - catch>>', error.response.data.error.message)
    }
  } else {
    contentButton.value = "S'inscrire"
    errorMessage.value = 'Veuillez remplir tous les champs'
    console.log('SignupView - else>>>')
  }
}
</script>
<template>
  <main id="main-signupview">
    <div class="container">
      <form action="sign-up" @submit.prevent="userSignup()">
        <h2>Bonjour !</h2>
        <p>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</p>

        <label
          >Nom *
          <input
            type="text"
            id="username"
            name="username"
            v-model="username"
            @input="clearErrorMessage()"
          />
        </label>

        <label
          >E-mail *
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            @input="clearErrorMessage()"
          />
        </label>

        <label
          >Mot de passe *
          <div class="div-password">
            <input
              :type="!visiblePassword ? 'password' : 'text'"
              id="password"
              name="password"
              v-model="password"
              @input="clearErrorMessage()"
            />
            <font-awesome-icon
              :icon="['far', 'eye-slash']"
              @click="visiblePassword = true"
              v-if="!visiblePassword"
            />
            <font-awesome-icon :icon="['far', 'eye']" @click="visiblePassword = false" v-else />
          </div>
        </label>

        <button>{{ contentButton }} <font-awesome-icon :icon="['fas', 'arrow-right']" /></button>

        <p class="error-message">{{ errorMessage }}</p>

        <div class="signup">
          <p>
            Vous avez déjà un compte ?
            <RouterLink :to="{ name: 'login' }"> Connectez-vous </RouterLink>
          </p>
        </div>
      </form>
    </div>
  </main>
</template>
<style scoped>
h2 {
  font-size: 24px;
  font-weight: bold;
}

.container {
  height: calc(100vh - var(--header-height) - var(--footer-height));
  background-image: url('../assets/imgs/illustration.png');
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

form {
  box-shadow: 0 0 7px var(--shadow-grey);
  background-color: #fff;
  border-radius: 10px;
  height: 490px;
  width: 480px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* -----fields------------- */
/* -label----- */
label {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 8px 0px;
}

label:nth-of-type(3) div {
  display: flex;
}

label:nth-of-type(3) svg {
  height: 40px;
  width: 40px;
  font-size: 10px;
  padding: 8px;
  border-radius: 0px 10px 10px 0px;
  background-color: #fff;
  border-left: 1px solid var(--middle-grey);
  color: var(--middle-grey);
}

/* -input----- */
input {
  height: 40px;
  width: 100%;
  padding: 10px;
}

input:focus {
  outline: none;
}

input[name='username'],
input[name='email'] {
  border-radius: 10px;
  border: 1px solid var(--middle-grey);
}

input[name='password'] {
  width: calc(100% - 40px);
  border-radius: 10px 0px 0px 10px;
  border: none;
}

.div-password {
  border: 1px solid var(--middle-grey);
  border-radius: 10px;
}

/* -----button 's'inscrire'---- */
button {
  height: 40px;
  background-color: var(--orange);
  border-radius: 10px;
  border: none;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-shrink: 0;
}

/* --------div signup-------- */
.signup {
  align-self: center;
  margin-top: 15px;
}

.signup a {
  font-weight: bold;
  color: var(--black);
}

.error-message {
  align-self: center;
  color: var(--orange);
}
</style>
