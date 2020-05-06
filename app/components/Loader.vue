<template>
  <div class="loader" v-if="show">
    <div class="loader-container">
      <img :src="loaderImage()" />
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: ["show"],
  methods: {
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

<style lang="scss" scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.loader-container {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(#fff, 0.5);
  z-index: 10000;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1.25rem;
  width: 180px;
  border-radius: 24px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.15);
  backdrop-filter: saturate(180%) blur(20px);
  text-align: center;

  @media screen and (prefers-color-scheme: dark) {
    background-color: rgba(29, 29, 31, 0.7);
    color: #fff;
  }

  img {
    width: 48px;
    border-radius: 24px;
  }

  p {
    text-align: center;
    margin: 0.5rem 0 0;
    font-size: 0.875rem;
  }
}
</style>