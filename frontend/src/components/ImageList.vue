<template>
  <div class="list-group">
    <p class="text-left">
      <button @click="removePhoto()" class="my-remove-button">
        <b>X</b>
      </button>
      <img :src="baseURL + imageURL" class="img-thumbnail" height="300px" width="300px" />
    </p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    imageURL: String,
    baseURL: String,
    id: String
  },
  methods: {
    async removePhoto() {
      await axios
        .delete(`${this.baseURL}/api/images/delete-image?id=${this.id}`)
        .then(res => {
          this.$swal(res.data.message);
          this.$emit("photo-deleted", this.id);
        })
        .catch(err => {
          this.$swal(err.response.data.message);
        });
    }
  }
};
</script>

<style scoped>
.my-remove-button {
  border-radius: 50%;
  text-align: center;
  position: absolute;
  color: white;
  background: rgba(97, 106, 107, 0.7);
}
</style>