<template>
  <div
    class="view"
    :style="{ backgroundColor: hsl }"
  >{{ message }}</div>
</template>
<script>
export default {
  props: {
    state: {
      type: Number,
      default: 0,
    },
    live: {
      type: String,
      default: '😂',
    },
    dead: {
      type: String,
      default: '💀',
    },
    hueRatio: {
      type: Number,
      default: 7,
    },
    satuation: {
      type: Number,
      default: 100,
    },
    luminance: {
      type: Number,
      default: 80,
    },
  },
  computed: {
    message() {
      return this.state === 0 ? this.dead : this.live;
    },
    hsl() {
      return this.state === 0
        ? `hsl(0, 0%, 20%)`
        : `hsl(${this.state * this.hueRatio}, ${this.satuation}%, ${this.luminance}%)`;
    },
  },
};
</script>
<style>
.view {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
}
</style>
