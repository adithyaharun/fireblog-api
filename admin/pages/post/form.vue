<template>
  <b-container>
    <div class="text-center" style="padding: 5em" v-show="fetching">
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" />
    </div>
    <div v-show="!fetching">
      <b-row no-gutters align-v="center" class="mt-5 mb-3">
        <b-col>
          <input
            type="text"
            name="title"
            v-model="data.title"
            placeholder="Enter title..."
            class="title-input"
          />
        </b-col>
      </b-row>
      <b-row class="my-3">
        <b-col cols="8" class="pr-0">
          <b-form-group>
            <template slot="label">
              Slug
              <span class="text-danger">*</span>
            </template>
            <b-form-input type="text" size="sm" v-model="data.slug" :disabled="saving" required />
          </b-form-group>
          <b-form-group>
            <template slot="label">
              Content
              <span class="text-danger">*</span>
            </template>
            <vue-easymde v-model="data.content" ref="markdownEditor" :disabled="saving" />
          </b-form-group>
          <b-card no-body class="mb-2">
            <b-tabs card>
              <b-tab title="Featured Image" active>
                <img class="mb-3" :src="data.featured || '/img/placeholder.png'" width="320" />
                <b-form-file
                  id="file-featured"
                  size="sm"
                  v-on:input="onFeaturedChange"
                  class="d-block mb-2"
                  accept="image/*"
                  v-model="featured"
                ></b-form-file>
                <div style="line-height: 1.0">
                  <small>* Maximum size is 2MB.</small>
                  <br />
                  <small>* Accepted formats: JPG, PNG, WEBP, GIF.</small>
                  <br />
                  <small>* Upload image to replace the current featured images.</small>
                </div>
              </b-tab>
              <b-tab title="Thumbnail Image">
                <img class="mb-3" :src="data.thumbnail || '/img/placeholder.png'" width="320" />
                <b-form-file
                  id="file-thumbnail"
                  size="sm"
                  v-on:input="onThumbnailChange"
                  class="d-block mb-2"
                  accept="image/*"
                  v-model="thumbnail"
                ></b-form-file>
                <div style="line-height: 1.0">
                  <small>* Maximum size is 2MB.</small>
                  <br />
                  <small>* Accepted formats: JPG, PNG, WEBP, GIF.</small>
                  <br />
                  <small>* Upload image to replace the current featured images.</small>
                </div>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
        <b-col cols="4">
          <div role="tablist">
            <b-card no-body class="mb-2">
              <b-card-header
                header-tag="header"
                role="tab"
                class="p-2"
                style="cursor: pointer"
                v-b-toggle.accordion-1
              >
                <font-awesome-icon icon="cog" class="mr-1" />
                <span>Post Options</span>
              </b-card-header>
              <b-collapse id="accordion-1" visible role="tabpanel">
                <b-card-body class="p-3">
                  <b-form-group>
                    <small slot="label">Post Status</small>
                    <b-form-select
                      size="sm"
                      v-model="data.status"
                      :options="statuses"
                      :disabled="saving"
                      required
                    ></b-form-select>
                  </b-form-group>
                  <b-form-group>
                    <small slot="label">Post Date</small>
                    <b-form-datepicker
                      type="date"
                      size="sm"
                      v-model="data.createdAt"
                      :disabled="saving"
                      :value-as-date="true"
                      required
                    />
                  </b-form-group>
                  <b-button
                    pill
                    size="sm"
                    variant="outline-secondary"
                    :disabled="saving"
                    @click="$router.push('/')"
                  >
                    <span>Cancel</span>
                  </b-button>
                  <b-button pill size="sm" variant="primary" :disabled="saving" @click="save">
                    <font-awesome-icon icon="save" class="mr-1" />
                    <span>Save</span>
                  </b-button>
                  <b-button
                    pill
                    size="sm"
                    variant="success"
                    :disabled="saving"
                    @click="data.status = 'published'; save()"
                  >
                    <font-awesome-icon icon="paper-plane" class="mr-1" />
                    <span>Publish</span>
                  </b-button>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </div>
    <transition name="overlay">
      <div
        class="position-fixed d-flex align-items-center justify-content-center"
        style="top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; background-color: rgba(255,255,255,0.85)"
        v-if="saving"
      >
        <div class="text-center p-4 bg-light rounded-lg">
          <b-spinner style="width: 48px; height: 48px" class="d-block mx-auto mb-3" variant="dark"></b-spinner>
          <span>Saving...</span>
        </div>
      </div>
    </transition>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
import VueEasymde from "vue-easymde";

export default {
  components: {
    VueEasymde
  },
  data() {
    return {
      id: null,
      featured: null,
      thumbnail: null,
      fetching: false,
      saving: false,
      state: "create",
      statuses: [
        { value: "published", text: "Published" },
        { value: "draft", text: "Draft" },
        { value: "trash", text: "Trash" }
      ],
      data: {
        slug: "",
        title: "",
        content: "",
        featured: null,
        thumbnail: null,
        status: "draft",
        createdAt: new Date()
      }
    };
  },
  head() {
    return {
      title: this.$route.query.state === "edit" ? "Edit Post" : "Create Post"
    };
  },
  methods: {
    async fetchPost(id) {
      this.fetching = true;

      try {
        let data = await this.loadPost(id);
        delete data.id;

        this.data = data;
        this.data.createdAt = new Date(data.createdAt);
        this.fetching = false;
      } catch (e) {
        this.fetching = false;
        console.error(e);
      }
    },
    onThumbnailChange(file) {
      this.onImageChange(file, "thumbnail");
    },
    onFeaturedChange(file) {
      this.onImageChange(file, "featured");
    },
    onImageChange(file, field) {
      console.log(file);

      var self = this;
      var reader = new FileReader();

      reader.onload = function() {
        var dataURL = this.result;
        self.data[field] = dataURL;
      };

      reader.readAsDataURL(file);
    },
    async upload(file, field) {
      var formData = new FormData();
      formData.append("file", file);

      let { data } = await this.$axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      this.data[field] = data.file;
    },
    async save() {
      this.saving = true;

      try {
        if (this.featured !== null) {
          await this.upload(this.featured, "featured");
        }

        if (this.thumbnail !== null) {
          await this.upload(this.thumbnail, "thumbnail");
        }

        let method = this.state === "edit" ? "put" : "post";
        let url = `/post${this.state === "edit" ? "/" + this.id : ""}`;
        let { data } = await this.$axios[method](url, this.data);

        this.saving = false;
      } catch (e) {
        this.saving = false;
        console.error(e);
      }
    },
    ...mapActions({
      loadPost: "post/find"
    })
  },
  mounted() {
    this.state = this.$route.query.state || "create";

    if (this.state === "edit") {
      this.id = this.$route.query.id;
      let data = this.$route.params.data;

      if (typeof this.id !== "undefined" && this.id !== null) {
        if (typeof data === "undefined" || data === null) {
          this.fetchPost(this.$route.query.id);
        } else {
          delete data.id;
          this.data = data;
        }
      }
    }
  }
};
</script>

<style>
@import "easymde/dist/easymde.min.css";

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.5s;
}

.overlay-enter,
.overlay-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.title-input {
  font-size: 2.5rem;
  font-weight: bolder;
  outline: 0;
  border: 0;
  background-color: transparent;
  border-bottom: 1px solid #efeef4;
  width: 100%;
}

.title-input:hover,
.title-input:focus,
.title-input:active {
  border-color: #a0a0a0;
}
</style>