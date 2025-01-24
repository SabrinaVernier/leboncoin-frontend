<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps(['sort', 'minprice', 'maxprice', 'title', 'page', 'numberOfPages'])
// console.log(props)

const selectedPage = (numPage) => {
  const queries = { ...props }
  delete queries.numberOfPages
  queries.page = numPage
  router.push({ name: 'home', query: queries })
}
</script>
<template>
  <div class="pagination">
    <button @click="selectedPage(page - 1)" v-if="page > 1">
      <font-awesome-icon :icon="['fas', 'angle-left']" />
    </button>

    <button v-else class="noDisplay">
      <font-awesome-icon :icon="['fas', 'angle-left']" />
    </button>

    <div>
      <div
        @click="selectedPage(num)"
        v-for="num in numberOfPages"
        :key="num"
        :class="{ selected: num === page }"
      >
        {{ num }}
      </div>
    </div>

    <button @click="selectedPage(page + 1)" v-if="page < numberOfPages">
      <font-awesome-icon :icon="['fas', 'angle-right']" />
    </button>

    <button v-else class="noDisplay">
      <font-awesome-icon :icon="['fas', 'angle-right']" />
    </button>
  </div>
</template>
<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 25px;
}

.pagination > div {
  display: flex;
}

.pagination > div > div {
  font-size: 16px;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.pagination button {
  border: none;
  background-color: #fff;
}

.noDisplay {
  color: var(--shadow-grey);
}

.selected {
  background-color: var(--black);
  color: white;
  border-radius: 3px;
}
</style>
