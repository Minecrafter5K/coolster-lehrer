<script setup lang="ts">
import { ref } from 'vue'
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()

const newAbstimmungName = ref('')
const newAbstimmungId = ref(0)
const newAbstimmungStartDate = ref(new Date())
const newAbstimmungEndDate = ref(new Date())

async function handleSubmit(e: Event) {
  e.preventDefault()
  const newId = newAbstimmungId.value === 0 ? undefined : newAbstimmungId.value

  const newAbstimmung = {
    id: newId,
    name: newAbstimmungName.value,
    startDate: newAbstimmungStartDate.value,
    endDate: newAbstimmungEndDate.value,
  }
  console.log(newAbstimmung)
  await adminStore.createAbstimmung(newAbstimmung)
  newAbstimmungName.value = ''
  newAbstimmungId.value = 0
  newAbstimmungStartDate.value = new Date()
  newAbstimmungEndDate.value = new Date()
}
</script>

<template>
  <div>
    <form @submit="handleSubmit">
      <label for="abstimmung-name">Name der Abstimmung:</label>
      <input id="abstimmung-name" type="text" v-model="newAbstimmungName" required /><br />

      <label for="abstimmung-id">ID der Abstimmung:</label>
      <input id="abstimmung-id" type="text" v-model="newAbstimmungId" /><br />

      <label for="abstimmung-startDate">Startdatum der Abstimmung:</label>
      <input
        id="abstimmung-startDate"
        type="datetime-local"
        v-model="newAbstimmungStartDate"
      /><br />

      <label for="abstimmung-endDate">Enddatum der Abstimmung:</label>
      <input id="abstimmung-endDate" type="datetime-local" v-model="newAbstimmungEndDate" /><br />

      <button type="submit">Abstimmung erstellen</button>
    </form>
  </div>
</template>

<style scoped>
form {
  margin: 5px;
}

input {
  padding-left: 5px;
  margin: 2px;
  border: 1px solid var(--cl-text);
  border-radius: 5px;

  cursor: pointer;
}

button {
  padding-left: 5px;
  padding-right: 5px;
  background-color: var(--cl-light-blue);
  border-radius: 5px;
  float: right;

  cursor: pointer;
}
</style>
