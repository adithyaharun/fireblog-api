<template>
  <div class="continent">
    <div class="posts">
      <h1 class="posts-title">Latest Stories</h1>
      <div class="p-t-100 p-b-100 text-center" v-if="loading">
        <img :src="loaderImage()" width="48" />
      </div>
      <div class="posts-collection">
        <Post v-for="post in posts" :key="post.id" :data="post" />
      </div>
    </div>
    <div class="posts-footer" v-if="!maxed">
      <a class="posts-load-more" @click="get">Load more stories</a>
    </div>
  </div>
</template>

<script>
import Post from "~/components/post/Item.vue";

import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: { Post },
  computed: {
    ...mapState({
      posts: state => state.post.all,
      loading: state => state.post.loading,
      maxed: state => state.post.maxed
    })
  },
  mounted() {
    document.title = "Adithya";

    if (this.posts.length === 0) {
      this.get();
    }
  },
  methods: {
    ...mapActions("post", ["get"]),
    loaderImage() {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "/images/loader-white.svg";
      }

      return "/images/loader.svg";
    }
  }
};
</script>

<style lang="scss">
.posts {
  color: #000000;

  .posts-title {
    margin-top: 3rem;
  }

  @media screen and (prefers-color-scheme: dark) {
    color: #ffffff;
  }
}

.posts-footer {
  border-top: 1px solid #efeef4;

  @media screen and (prefers-color-scheme: dark) {
    border-color: #2f2f2f;
  }

  .posts-load-more {
    display: block;
    padding: 1.5rem;
    font-size: smaller;
    text-align: center;
    cursor: pointer;
    color: #147efb;
  }
}
</style>