<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-vue">
    <a class="navbar-brand" href="/">Vue Image</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-for="link in links" :key="link.name">
          <router-link :to="link.route" class="nav-link" active-class="active">{{ link.name }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: "Home", route: "/" },
        { name: "Add Image", route: "/add-image" },
        { name: "Drop Zone", route: "/dropzone-upload" }
      ]
    };
  }
};
</script>

<style scoped>
.bg-vue {
  background-color: #52be80;
}
</style>