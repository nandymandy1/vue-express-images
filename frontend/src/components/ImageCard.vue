<template>
  <div class="mt-2 mb-1">
    <div class="card" style="width: 25rem;">
      <img class="card-img-top" :src="imageURL" alt="Card image cap" />
      <div class="card-body">
        <p class="card-text">
          <button class="btn btn-danger" @click="deleteImage()">Delete</button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: {
    imageURL: String,
    id: String
  },
  data() {
    return {
      baseURL:
        process.env.NODE_ENV === "production" ? "" : "http://localhost:5000"
    };
  },
  methods: {
    async deleteImage() {
      try {
        let { data } = await axios.delete(
          `${this.baseURL}/api/images/delete-image?id=${this.id}`
        );
        if (data.success) {
          this.$emit("image-deleted", this.id);
        }
        this.$swal(data.message);
      } catch (err) {
        this.$swal("Please try again later.");
      }
    }
  }
};
</script>