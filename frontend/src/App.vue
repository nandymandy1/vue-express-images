<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar
  }
};
</script>

<style>
.card {
  border-radius: 0;
}
img.card-img-top {
  border-radius: 0;
}
.btn {
  border-radius: 0;
}
</style>
