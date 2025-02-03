<script setup lang="ts"></script>

<template>
  <div class="header">
    <div>
      <router-link to="/">
        <button class="btn vote">Vote</button>
      </router-link>
      <router-link to="/stats">
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
  margin-top: 1rem;
}

.btn {
  background-color: var(--cl-light-blue);
  color: var(--cl-text);
  font-weight: bold;
  font-size: 1.2rem;

  width: 145px;
  height: 30px;
  padding: 0;
  margin-bottom: 8px;
  margin-left: 5px;
  margin-right: 5px;

  border: none;
  border-radius: 15px;
  cursor: pointer;
}

#title {
  background-color: var(--cl-light-blue);
  color: var(--cl-text);
  font-size: 1.5rem;
  font-weight: bold;

  width: 300px;
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
