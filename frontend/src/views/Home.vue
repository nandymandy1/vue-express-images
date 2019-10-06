<template>
  <div class="home d-flex justify-content-center">
    <div v-if="!loading">
      <div v-if="images.length" class="d-flex flex-column">
        <ImageCard
          v-for="(image) in images"
          :key="image._id"
          :id="image._id"
          :imageURL="baseURL + image.imagePath"
          @image-deleted="imageDeleted"
        />
        <div class="pagination-area mt-3 d-flex justify-content-center">
          <nav aria-label="...">
            <ul class="pagination">
              <li :class="!paginationData.hasPrevPage ?'page-item disabled' : 'page-item'">
                <a
                  class="page-link"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                  @click.prevent="navigatePrev()"
                >Prev</a>
              </li>
              <li class="page-item" v-if="paginationData.currentPage - 1 !== 0">
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="navigatePage(paginationData.currentPage - 1)"
                >{{ paginationData.currentPage - 1 }}</a>
              </li>
              <li class="page-item active" aria-current="page">
                <a class="page-link" href="#">{{ paginationData.currentPage }}</a>
              </li>
              <li class="page-item" v-if="paginationData.hasNextPage">
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="navigatePage(paginationData.next)"
                >{{ paginationData.next }}</a>
              </li>
              <li :class="!paginationData.hasNextPage ?'page-item disabled' : 'page-item'">
                <a class="page-link" @click.prevent="navigateNext()" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <p v-else class="my-5 text-center text-muted">No Photos available...</p>
    </div>
    <div v-else class="mt-5 d-flex justify-content-center">
      <div class="spinner-border text-success" role="status"></div>
      <p class="mt-1 ml-2">loading</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ImageCard from "@/components/ImageCard";

export default {
  name: "home",
  components: {
    ImageCard
  },
  data() {
    return {
      images: [],
      loading: true,
      baseURL:
        process.env.NODE_ENV === "production" ? "" : "http://localhost:5000",
      page: 1,
      paginationData: null
    };
  },
  methods: {
    async getImages() {
      this.loading = true;
      try {
        let { data } = await axios.get(
          `${this.baseURL}/api/images/get-images?page=${this.page}`
        );
        this.images = data.photos;
        this.paginationData = data.paginator;
      } catch (err) {
        this.$swal("Unable to fetch the images");
      }
      this.loading = false;
    },

    navigatePage(page) {
      this.page = page;
      this.getImages();
    },

    navigatePrev() {
      this.page--;
      this.getImages();
    },

    navigateNext() {
      this.page++;
      this.getImages();
    },

    imageDeleted(id) {
      this.getImages();
    }
  },
  created() {
    this.getImages();
  }
};
</script>
