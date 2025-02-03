<script setup lang="ts"></script>

<template>
  <div class="header">
    <div class="btn-container">
      <router-link to="/" style="width: 100%">
        <button class="btn vote">Vote</button>
      </router-link>
      <router-link to="/stats" style="width: 100%">
        <button class="btn stats">Stats</button>
      </router-link>
    </div>
    <h1 id="title">Coolster Lehrer</h1>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-container {
  display: flex;
  gap: 10px;

  width: 100%;

  margin-bottom: 8px;
}

.btn {
  background-color: var(--cl-light-blue);
  color: var(--cl-text);
  font-weight: bold;
  font-size: 1.2rem;

  width: 100%;
  height: 30px;
  padding: 0;

  border: none;
  border-radius: 15px;
  cursor: pointer;
}

#title {
  background-color: var(--cl-light-blue);
  color: var(--cl-text);
  font-size: 1.5rem;
  font-weight: bold;

  width: 100%;
  height: 50px;

  line-height: 50px;
  border-radius: 15px;
  text-align: center;
  align-self: center;
}

@media (min-width: 650px) {
  .header {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  #title {
    width: 100%;
  }

  .btn-container {
    width: auto;
  }

  .btn {
    padding: 0;
    width: 130px;
    height: 50px;
    border-radius: 15px;

    margin-left: 0px;
    margin-right: 0px;
  }

  .vote {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
  }

  .stats {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
