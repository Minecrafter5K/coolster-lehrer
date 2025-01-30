<script setup lang="ts"></script>

<template>
  <div class="header">
    <div>
      <button class="btn vote">Vote</button>
      <button class="btn stats">Stats</button>
    </div>
    <h1 id="title">Coolster Lehrer</h1>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px 32px 16px;
}

.btn {
  background-color: var(--cl-light-blue);
  color: black;
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
  color: black;
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
    width: calc(100vw - 290px);
  }

  .btn {
    padding: 0;
    width: 130px;
    height: 50px;
    border-radius: 15px;
  }

  .vote {
    position: absolute;
    left: 32px;
    top: 50%;
    transform: translateY(-50%);
  }

  .stats {
    position: absolute;
    right: 32px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
