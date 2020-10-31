<template>
  <header class="north-pole">
    <nav>
      <router-link to="/" class="title">Adithya</router-link>
      <div class="signpost">
        <ul>
          <li>
            <a target="_blank" href="https://about.me/adithyaharun">About Me</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NorthPole"
};
</script>

<style lang="scss" scoped>
.north-pole {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #efeef4;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: rgba(255, 255, 255, 0.7);

  @media screen and (prefers-color-scheme: dark) {
    border-bottom: 1px solid #2f2f2f;
    background-color: rgba(29, 29, 31, 0.7);
  }

  nav {
    margin: auto;
    max-width: 640px;
    line-height: 5rem;
    display: flex;
    align-items: stretch;

    .title {
      display: block;
      text-decoration: none;
      color: #000;
      font-family: "Consolas", "Courier New", Courier, monospace;
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 5rem;

      @media screen and (prefers-color-scheme: dark) {
        color: #fff;
      }
    }

    .signpost {
      margin-left: auto;

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        li {
          display: inline-block;
          padding-left: 1.5rem;

          a {
            display: block;
            line-height: 5rem;
            text-decoration: none;
            color: #000;
            cursor: pointer;

            @media screen and (prefers-color-scheme: dark) {
              color: #ffffff;
            }

            &:hover,
            &:active {
              text-decoration: underline;
            }
          }
        }
      }
    }

    @media screen and (max-width: 414px) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
}
</style>
