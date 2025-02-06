<script setup lang="ts">
import LehrerPanel from '@/components/admin/ClLehrerPanel.vue'
import ClAbstimmungenPanel from '@/components/admin/ClAbstimmungenPanel.vue'
import ClCreateAbstimmung from '@/components/admin/ClCreateAbstimmung.vue'
import ClCreateLehrer from '@/components/admin/ClCreateLehrer.vue'
</script>

<template>
  <main>
    <h1 class="mt-6 text-3xl">Admin panel</h1>
    <h2 class="text-xl">Lehrer</h2>
    <LehrerPanel />
    <ClCreateLehrer />

    <h2 class="text-xl">Abstimmungen</h2>
    <ClAbstimmungenPanel />
    <ClCreateAbstimmung />
  </main>
</template>

<style scoped>
h2 {
  margin-top: 10px;
  margin-left: 2px;
}
</style>
