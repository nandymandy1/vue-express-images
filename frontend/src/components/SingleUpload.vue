<template>
  <div class="card single-upload">
    <div class="card-header bg-myBlue text-white">Single Upload</div>
    <div class="card-body">
      <form enctype="multipart/form-data" @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="file-upload">Choose a file</label>
          <button class="btn btn-info btn-upload-button">Upload</button>
          <input
            type="file"
            class="form-control-file"
            id="file-upload"
            ref="file"
            @change="onSelectFile"
          />
          <br />
          <p v-if="file">{{ file.name }}</p>
        </div>
        <div class="fields">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
    <div class="card-footer" v-if="uploadedFile">
      <ImageList :baseURL="baseURL" :id="id" :imageURL="uploadedFile" @photo-deleted="removeImage" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ImageList from "./ImageList";
export default {
  components: {
    ImageList
  },
  data() {
    return {
      file: "",
      uploadedFile: "",
      id: "",
      baseURL:
        process.env.NODE_ENV === "production" ? "" : "http://localhost:5000"
    };
  },
  methods: {
    onSelectFile() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },

    async onSubmit() {
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        let { data } = await axios.post(
          `${this.baseURL}/api/images/upload-single`,
          formData
        );
        this.uploadedFile = data.image.imagePath;
        this.id = data.image._id;
        this.file = "";
        this.$refs.file.value = "";
      } catch (err) {
        this.$swal("Unable to upload the image.");
      }
    },

    removeImage() {
      this.uploadedFile = "";
    }
  }
};
</script>

<style scoped>
</style>