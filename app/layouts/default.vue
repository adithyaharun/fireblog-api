<template>
  <div id="earth">
    <NorthPole />
    <Continent>
      <nuxt />
    </Continent>
    <SouthPole />
  </div>
</template>

<script>
import Continent from "~/components/Continent";
import NorthPole from "~/components/NorthPole";
import SouthPole from "~/components/SouthPole";

export default {
  components: { Continent, NorthPole, SouthPole }
};
</script>