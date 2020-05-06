<template>
  <footer class="south-pole">
    <ul>
      <li class="facebook">
        <a href="https://fb.me/adithyaharun" target="_blank">Facebook</a>
      </li>
      <li class="twitter">
        <a href="https://twitter.com/adithyaharun" target="_blank">Twitter</a>
      </li>
      <li class="instagram">
        <a href="https://instagram.com/adithyaharun" target="_blank">Instagram</a>
      </li>
    </ul>
    <small>&copy; 2019.</small>
  </footer>
</template>

<script>
export default {
  name: "SouthPole"
};
</script>

<style lang="scss" scoped>
.south-pole {
  border-top: 1px solid #f0f0f0;
  padding: 3rem 0;
  margin: auto;
  width: 960px;
  text-align: center;
  color: #b0b0b0;
  height: 150px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  @media screen and (prefers-color-scheme: dark) {
    border-top: 1px solid #2f2f2f;
    color: #505050;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 16px;

      &:last-child {
        padding-right: 0;
      }

      a {
        font-size: 0.825rem;
        text-decoration: none;
        color: black;
        font-weight: bold;

        @media screen and (prefers-color-scheme: dark) {
          color: #ffffff;
        }
      }

      &.facebook > a:hover,
      &.facebook > a:active {
        color: #3b5988;
        border-bottom: 1px solid #3b5988;
      }

      &.twitter > a:hover,
      &.twitter > a:active {
        color: #0084b4;
        border-bottom: 1px solid #0084b4;
      }

      &.instagram > a:hover,
      &.instagram > a:active {
        background: linear-gradient(
          to right,
          #feda75,
          #fa7e1e,
          #d62976,
          #962fbf,
          #4f5bd5
        );
        background: -webkit-linear-gradient(
          to right,
          #feda75,
          #fa7e1e,
          #d62976,
          #962fbf,
          #4f5bd5
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        // Thanks to snippet from: https://css-tricks.com/snippets/css/gradient-text/

        position: relative;

        &:before {
          content: "";
          height: 1px;
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          background: linear-gradient(
            to right,
            #feda75,
            #fa7e1e,
            #d62976,
            #962fbf,
            #4f5bd5
          );
          background: -webkit-linear-gradient(
            to right,
            #feda75,
            #fa7e1e,
            #d62976,
            #962fbf,
            #4f5bd5
          );
        }
      }
    }
  }

  @media screen and (max-width: 414px) {
    width: 100%;
  }
}
</style>