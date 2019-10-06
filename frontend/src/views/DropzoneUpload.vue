<template>
  <div>
    <div class="row mt-3">
      <h1 class="text-center">Dropzone</h1>
      <div class="col-12">
        <Dropzone />
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from "@/components/Dropzone.vue";
export default {
  components: {
    Dropzone
  }
};
</script>