<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['sort', 'minprice', 'maxprice', 'title', 'page'])
// console.log('props searchBySort >>>>', props)

const minimumPrice = ref(props.minprice)
const maximumPrice = ref(props.maxprice)
const sortByPrice = ref(props.sort)

const router = useRouter()

const handleSubmit = () => {
  const queries = { ...props }
  // console.log('queries', queries)

  if (minimumPrice.value) {
    queries.minprice = minimumPrice.value
  } else {
    delete queries.minprice
  }
  if (maximumPrice.value) {
    queries.maxprice = maximumPrice.value
  } else {
    delete queries.maxprice
  }
  if (sortByPrice.value) {
    queries.sort = sortByPrice.value
  } else {
    delete queries.sort
  }
  // console.log('queries updated', queries)

  queries.page = 1

  router.push({
    name: 'home',
    query: queries,
  })
}
</script>
<template>
  <form action="sort by price" id="form-sort" @submit.prevent="handleSubmit">
    <div id="sortMaxMin">
      <section>
        <p>Prix</p>
        <div class="input-number">
          <input type="number" id="minimum" placeholder="Minimum" min="0" v-model="minimumPrice" />
          <label for="minimum">€</label>
          <input
            type="number"
            id="maximum"
            placeholder="Maximum"
            :min="minimumPrice"
            v-model="maximumPrice"
          />
          <label for="maximum">€</label>
        </div>
      </section>

      <section>
        <p>Tri</p>
        <div class="input-radio-hidden650">
          <label for="increasing"
            >Prix croissants<input
              type="radio"
              value="price:asc"
              id="increasing"
              v-model="sortByPrice"
          /></label>

          <label for="decreasing"
            >Prix décroissants<input
              type="radio"
              value="price:desc"
              id="decreasing"
              v-model="sortByPrice"
          /></label>

          <label for="noSorting"
            >Pas de tri<input type="radio" value="" id="noSorting" v-model="sortByPrice"
          /></label>
        </div>

        <div class="input-radio-display650">
          <label for="increasing"
            ><font-awesome-icon :icon="['fas', 'sort-amount-up']" /><input
              type="radio"
              value="price:asc"
              id="increasing"
              v-model="sortByPrice"
          /></label>

          <label for="decreasing"
            ><font-awesome-icon :icon="['fas', 'sort-amount-down']" /><input
              type="radio"
              value="price:desc"
              id="decreasing"
              v-model="sortByPrice"
          /></label>

          <label for="noSorting"
            ><font-awesome-icon :icon="['fas', 'ban']" /><input
              type="radio"
              value=""
              id="noSorting"
              v-model="sortByPrice"
          /></label>
        </div>
      </section>
    </div>

    <button>Rechercher</button>
  </form>
</template>
<style scoped>
form {
  display: flex;
  gap: 50px;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0px;
  width: 100%;
}

form div {
  display: flex;
}

form section {
  margin-right: 20px;
}

p {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

/* -----section price----------- */
input[type='number'] {
  height: 43px;
  width: 150px;
  padding-left: 10px;
  border-radius: 15px 0px 0px 15px;
  border: 1px solid var(--light-grey);
  border-right: none;
}
input[type='number']::placeholder {
  font-size: 16px;
}
.input-number {
  display: flex;
}
.input-number label {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 43px;
  width: 45px;
  margin-right: 20px;
  font-size: 14px;
  border-radius: 0px 15px 15px 0px;
  border: 1px solid var(--light-grey);
}

/* enlève les flèches dans l'input type "number" */
.input-number input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* -----section sort--------- */
.input-radio-hidden650 {
  display: flex;
  gap: 15px;
  align-items: center;
}

/* -----button---------------- */
form > button {
  padding: 8px 10px;
  background-color: var(--orange);
  border: none;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 10px;
}

.input-radio-display650 {
  display: none;
}
</style>
