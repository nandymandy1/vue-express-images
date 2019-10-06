<template>
  <div>
    <div class="dropzone">
      <input type="file" class="input-file" ref="file" @change="uploadFiles" />
      <p v-if="!uploading" class="call-to-action">Drag Your Files Here</p>
      <p v-if="uploading" class="call-to-action">Uploading</p>
    </div>
    <div class="progress mt-3" v-if="uploading">
      <div
        class="progress-bar progress-bar-striped bg-success"
        role="progressbar"
        :style="`width:${progress}%`"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
      >{{ progress }}%</div>
    </div>
    <div class="content mt-3" v-if="uploadedFiles.length">
      <ImageList
        v-for="file in uploadedFiles"
        :key="file._id"
        :id="file._id"
        :baseURL="baseURL"
        :imageURL="file.imagePath"
        @photo-deleted="removeImage"
      />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import ImageList from "./ImageList";

export default {
  components: {
    ImageList
  },
  data() {
    return {
      baseURL:
        process.env.NODE_ENV === "production" ? "" : "http://localhost:5000",
      uploadedFiles: [],
      progress: null,
      uploading: null
    };
  },
  methods: {
    async uploadFiles() {
      const file = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append("file", file);
      try {
        this.uploading = true;
        let { data } = await axios.post(
          `${this.baseURL}/api/images/upload-dropzone`,
          formData,
          {
            onUploadProgress: e =>
              (this.progress = Math.round((e.loaded * 100) / e.total))
          }
        );
        if (data.success) {
          this.uploadedFiles.unshift(data.image);
          this.uploading = false;
          this.progress = 0;
        }
      } catch (err) {
        this.uploading = false;
      }
    },

    removeImage(id) {
      this.uploadedFiles = this.uploadedFiles.filter(file => file._id !== id);
    }
  }
};
</script>

<style scoped>
.dropzone {
  min-height: 250px;
  padding: 10px 10px;
  position: relative;
  cursor: pointer;
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
}
.dropzone:hover {
  background: lightblue;
}
.dropzone .call-to-action {
  font-size: 1.2rem;
  text-align: center;
  padding: 80px 0;
}
.input-file {
  opacity: 0;
  height: 230px;
  width: 98%;
  position: absolute;
  cursor: pointer;
}
</style>