<template>
  <div>
    <h1 class="text-center">Image Uploads</h1>
    <div class="row mt-3">
      <div class="col-md-6">
        <SingleUpload />
      </div>
      <div class="col-md-6">
        <MultiImage />
      </div>
    </div>
  </div>
</template>
<script>
import SingleUpload from "@/components/SingleUpload.vue";
import MultiImage from "@/components/MultiImage.vue";
export default {
  components: {
    SingleUpload,
    MultiImage
  }
};
</script>

<style >
.bg-myBlue {
  background: #2874a6;
}
.form-control-file {
  background: #2874a6;
  opacity: 0;
  height: 38px;
}
.card-header {
  border-radius: 0;
}
.form-group > .btn-upload-button {
  position: absolute;
  margin-top: 32px;
  margin-left: -94px;
  width: 97px;
}
.card-footer {
  background: #fff;
}
</style>