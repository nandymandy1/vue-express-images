<template>
  <div class="card single-upload">
    <div class="card-header bg-myBlue text-white">Multiple Upload</div>
    <div class="card-body">
      <form enctype="multipart/form-data" @submit.prevent="uploadFiles()">
        <div class="form-group">
          <label for="file-upload">Choose files</label>
          <button class="btn btn-info btn-upload-button">Upload</button>
          <input
            multiple
            type="file"
            class="form-control-file"
            id="file-upload"
            ref="files"
            @change="filesSelected"
          />
          <br />
          <ul v-if="files.length" class="list-group">
            <li class="list-group-item" v-for="(file, index) in files" :key="index">
              {{ file.name }}
              <button class="delete-button" @click.prevent="deleteFile(index)">
                <b>X</b>
              </button>
            </li>
          </ul>
        </div>
        <div class="fields">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
    <div class="card-footer" v-if="uploadedFiles.length">
      <ImageList
        v-for="file in uploadedFiles"
        :key="file._id"
        :baseURL="baseURL"
        :id="file._id"
        :imageURL="file.path"
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
  data() {
    return {
      files: [],
      baseURL:
        process.env.NODE_ENV === "production" ? "" : "http://localhost:5000",
      uploadedFiles: []
    };
  },
  components: {
    ImageList
  },
  methods: {
    filesSelected() {
      const files = this.$refs.files.files;
      this.files = [...this.files, ...files];
    },

    deleteFile(i) {
      this.files.splice(i, 1);
    },

    async uploadFiles() {
      if (this.files.length) {
        let formData = new FormData();
        _.forEach(this.files, file => formData.append("files", file));
        await axios
          .post(`${this.baseURL}/api/images/upload-multiple`, formData)
          .then(res => {
            this.files = [];
            this.$refs.files.value = "";
            this.uploadedFiles = [...res.data];
          })
          .catch(err => console.log(err));
      }
    },

    removeImage(id) {
      this.uploadedFiles = this.uploadedFiles.filter(file => file._id !== id);
    }
  }
};
</script>

<style scoped>
.delete-button {
  width: 30px;
  border-radius: 50%;
  text-align: center;
  height: 30px;
}
.delete-button:active {
  background: rgba(231, 76, 60, 0.6);
  color: #fff;
}
</style>