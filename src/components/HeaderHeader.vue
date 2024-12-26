<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { inject } from 'vue'

import BtnPublishOffer from '../components/BtnPublishOffer.vue'

const globalStore = inject('GlobalStore')

const router = useRouter()

const disconnect = () => {
  globalStore.connectedUser.value = []
  router.push({ name: 'home' })
}
</script>
<template>
  <header>
    <div class="container">
      <section class="functionality">
        <RouterLink :to="{ name: 'home' }">
          <img src="../assets/imgs/logo.svg" alt="logo leboncoin" />
        </RouterLink>

        <div class="deposit-search">
          <BtnPublishOffer />
          <div class="div-input">
            <input type="text" placeholder="Rechercher sur leboncoin" name="search" id="search" />
            <button><font-awesome-icon :icon="['fas', 'search']" /></button>
          </div>
        </div>

        <div class="user-log-in">
          <font-awesome-icon :icon="['far', 'user']" />
          <RouterLink :to="{ name: 'login' }" v-if="globalStore.connectedUser.value.length === 0">
            <button>Se connecter</button>
          </RouterLink>

          <div v-else>
            <p>
              {{ globalStore.connectedUser.value[0].username }}
            </p>
            <div class="disconnect-icon">
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" @click="disconnect()" />
            </div>
          </div>
        </div>
      </section>

      <section class="category">
        <p>Immobilier</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Véhicules</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Locations de vacances</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Emploi</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Mode</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Maison & Jardin</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Famille</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Electronique</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Loisirs</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Autres</p>
      </section>
    </div>
  </header>
</template>
<style scoped>
header {
  height: var(--header-height);
  padding-top: 10px;
  border-bottom: 1px solid var(--grey);
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
}

header > div {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* ----section top-------------*/
/* logo leboncoin-- */
.functionality img {
  height: 28px;
}
/* div button-input-- */
.deposit-search {
  display: flex;
  align-items: center;
  gap: 20px;
}
.div-input {
  background-color: var(--light-grey);
  padding: 5px 10px;
  border-radius: 10px;
}
.div-input input {
  background-color: var(--light-grey);
  border: none;
  font-size: 12px;
  width: 250px;
}
.div-input input::placeholder {
  color: #757575;
}
.div-input button {
  height: 30px;
  width: 30px;
  border-radius: 7px;
  border: none;
  background-color: var(--orange);
}
/* user-log-in--- */
.user-log-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  text-decoration: none;
  color: var(--black);
  position: relative;
  padding: 0px 20px;
}
.user-log-in button {
  border: none;
  background-color: #fff;
  font-size: 12px;
}
.disconnect-icon {
  position: absolute;
  right: 0px;
  top: 10px;
}

/* ----section bottom--------- */
.category svg {
  font-size: 3px;
}
.category p {
  font-size: 14px;
}
</style>
