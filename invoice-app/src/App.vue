<script setup></script>

<template>
  <main>
    <h1 class="title">MiniBill Invoicing</h1>
    <router-view />
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f9fafb;
  min-height: 100vh;
}

.title {
  text-align: center;
  color: #3b3687;
  margin-bottom: 2rem;
}
</style>
