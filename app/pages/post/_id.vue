<template>
  <div class="continent">
    <div class="post-detail">
      <Loader :show="loading" />
      <div class="post-meta" v-if="!loading">
        <h1 class="post-title">{{ data.title }}</h1>
        <small class="post-date">Published at {{ date(data.createdAt) }}</small>
      </div>
      <div class="post-thumbnail" v-if="data.featured">
        <img :src="data.featured" width="100%" />
      </div>
      <div class="post-content" v-html="parsedContents"></div>
    </div>
  </div>
</template>

<script>
import Loader from "~/components/Loader.vue";
import parser from "~/helpers/MarkdownParser.js";

export default {
  name: "PostDetail",
  components: { Loader },
  props: {
    post: Object
  },
  data() {
    return {
      loading: false,
      parsedContents: "",
      data: {}
    };
  },
  mounted() {
    if (typeof this.$route.params.post === "undefined") {
      this.fetchPost();
    } else {
      this.data = this.$route.params.post;
      this.parsedContents = parser.makeHtml(this.data.content);
      this.setTitle();
    }
  },
  methods: {
    setTitle() {
      document.title = `${this.data.title} | Adithya`;
    },
    date(dateString) {
      let date = new Date(dateString);

      if (
        typeof dateString === "undefined" ||
        typeof date === "undefined" ||
        dateString === null ||
        date === null
      ) {
        return "... unknown date?";
      }

      return ` ${date.toLocaleString("default", {
        month: "long"
      })} ${date.getDate()}, ${date.getFullYear()}`;
    },
    fetchPost() {
      this.loading = true;

      this.$axios
        .get(`/post/${this.$route.params.id}`)
        .then(response => {
          this.data = response.data;
          this.parsedContents = parser.makeHtml(response.data.content);
          this.setTitle();
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss">
.post-meta {
  padding: 3rem 0;
  text-align: center;

  .post-title {
    margin: 0;
    font-size: 2rem;
    margin-top: 0 !important;
  }

  .post-date {
    color: rgba(#000, 0.5);

    @media screen and (prefers-color-scheme: dark) {
      color: rgba(#fff, 0.5);
    }
  }

  @media screen and (prefers-color-scheme: dark) {
    color: #ffffff;
  }
}

.post-thumbnail {
  width: 100%;
  margin-bottom: 3rem;
}

.post-detail {
  margin-bottom: 3rem;

  .post-content {
    color: #000000;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 2.5rem;
      position: relative;

      &:hover > a {
        display: block;
      }

      a {
        display: none;
        position: absolute;
        top: 0;
        text-align: right;
        left: -36px;
        width: 36px;
        color: rgba(#000, 0.25);
        text-decoration: none;
        content: "#";

        &:hover {
          color: rgba(#000, 0.75);

          @media screen and (prefers-color-scheme: dark) {
            color: rgba(#fff, 0.75);
          }
        }

        @media screen and (prefers-color-scheme: dark) {
          color: rgba(#fff, 0.25);
        }
      }
    }

    @media screen and (prefers-color-scheme: dark) {
      color: #ffffff;
    }
  }
}
</style>