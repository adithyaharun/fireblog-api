<template>
  <article class="post">
    <nuxt-link
      :to="{
        name: 'post-id',
        params: { id: data.slug, post: data }
      }"
    >
      <section class="post-image">
        <img :src="data.thumbnail" width="100%" />
      </section>
      <section class="post-content">
        <section class="post-header">
          <h2 class="post-title">{{ data.title }}</h2>
          <span class="post-date">Published at{{ prettifyDate(data.createdAt) }}</span>
        </section>
        <section class="post-excerpt" v-html="parse(data.excerpt)"></section>
      </section>
    </nuxt-link>
  </article>
</template>

<script>
import parser from "~/helpers/MarkdownParser";

export default {
  name: "Post",
  props: ["data"],
  methods: {
    parse(contents) {
      return parser.makeHtml(contents);
    },
    prettifyDate(dateString) {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.post {
  padding: 3rem 0;
  border-top: 1px solid #efeef4;
  color: #000000;

  a {
    color: #000000;
    text-decoration: none;
    display: flex;

    &:hover .post-title,
    &:active .post-title {
      text-decoration: underline;
      color: #147efb;
    }

    @media screen and (max-width: 414px) {
      display: block;
    }
  }

  .post-image {
    width: 180px;
    margin-right: 2rem;

    @media screen and (max-width: 414px) {
      margin-right: 0;
      width: 128px;
      margin-bottom: 2rem;
    }
  }

  .post-content {
    .post-title {
      margin: 0;
      font-weight: 600;
    }

    .post-date {
      color: rgba($color: #000000, $alpha: 0.5);
      font-size: 0.875rem;
      margin: 0.75rem 0 0.5rem;
      display: inline-block;

      @media screen and (prefers-color-scheme: dark) {
        color: rgba(#fff, 0.5);
      }
    }

    .post-excerpt {
      color: rgba($color: #000000, $alpha: 0.75);

      * {
        margin: 0;
      }

      @media screen and (prefers-color-scheme: dark) {
        color: #ffffff !important;
      }
    }

    img {
      display: block;
      margin: auto;
      max-width: 100%;
      box-shadow: 0 4px 8px rgba(#000000, 0.25);
      -webkit-transition: all 200ms;
      transition: all 200ms;

      &:hover {
        box-shadow: 0 8px 16px rgba(#000000, 0.5);
      }

      @media screen and (prefers-color-scheme: dark) {
        box-shadow: 0 4px 8px rgba(#fff, 0.25);

        &:hover {
          box-shadow: 0 8px 16px rgba(#fff, 0.5);
        }
      }
    }

    @media screen and (prefers-color-scheme: dark) {
      color: #ffffff;
    }
  }

  @media screen and (prefers-color-scheme: dark) {
    border-top-color: #2f2f2f;
    color: #ffffff;
  }
}
</style>