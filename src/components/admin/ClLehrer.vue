<script setup lang="ts">
import type { Lehrer } from '@/interfaces/Lehrer'
import { ref, onMounted } from 'vue'
import { useAdminStore } from '@/stores/admin'

// props & admin store
const props = defineProps<{ lehrer: Lehrer; deleteLehrer: (id?: number) => void }>()
const store = useAdminStore()

// photo state
const hasPhoto = ref(false)
const selectedFile = ref<File | null>(null)

// check if photo exists
if (props.lehrer.photo_id) hasPhoto.value = true

// handlers
const onFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files && files[0]) selectedFile.value = files[0]
}
const uploadPhoto = async () => {
  if (!selectedFile.value) return
  const reader = new FileReader()
  reader.readAsDataURL(selectedFile.value)
  reader.onload = async () => {
    const base64 = (reader.result as string).split(',')[1]
    await store.uploadLehrerPhoto(props.lehrer.id, base64)
    hasPhoto.value = true
  }
}
const removePhoto = async () => {
  await store.deleteLehrerPhoto(props.lehrer.id)
  hasPhoto.value = false
}
</script>

<template>
  <div class="flex justify-between">
    <p>{{ props.lehrer.name }}</p>
    <div class="flex gap-2">
      <div v-if="!hasPhoto">
        <input type="file" @change="onFileChange" accept="image/*" class="" />
        <button @click="uploadPhoto" class="bg-green-500 px-2 text-white" :disabled="!selectedFile">
          Upload
        </button>
      </div>
      <button v-if="hasPhoto" @click="removePhoto" class="bg-red-500 px-2 text-white">
        Remove Photo
      </button>
      <button @click="props.deleteLehrer(props.lehrer.id)" class="cursor-pointer bg-blue-200 px-2">
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped>
p {
  margin-left: 5px;
}

button {
  padding-left: 5px;
  padding-right: 5px;
  background-color: var(--cl-light-blue);
}
</style>
