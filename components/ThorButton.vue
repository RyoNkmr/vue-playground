<template>
  <div
    class="thor-button"
    :class="{
    'thor-button--primary': primary,
    'thor-button--secondary': !primary && secondary,
    'thor-button--negative': negative,
    'thor-button--active': clicked
    }"
  >
    <button
      :style="style"
      @click.prevent="onClick"
    >
      <slot />
    </button>
    <span class="thor-button__shadow" :style="style" />
    <span class="thor-button__wave" :style="style" />
    <span class="thor-button__wave" :style="style" />
    <span class="thor-button__wave" :style="style" />
  </div>
</template>
<script>
export default {
  props: {
    primary: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    negative: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 2100,
    },
  },
  data() {
    return {
      clicked: false,
      timer: null,
    };
  },
  methods: {
    onClick() {
      if (this.timer !== null) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.clicked = true;
      this.timer = setTimeout(() => {
        this.clicked = false;
        this.timer = null;
        this.$emit('click');
      }, this.duration);
    },
  },
  computed: {
    style() {
      return {
        animationDuration: `${Math.max(1200, this.duration - 300)}ms`,
      };
    },
  },
}
</script>
<style lang="scss" scoped>
.thor-button {
  display: inline-flex;
  $root: &;
  position: relative;

  button {
    padding: 4px 24px;
    border: 0;
    outline: none;
    appearance: none;
    background-color: #fff;
  }

  &__shadow {
    position: absolute;
    top: 1px;
    left: 2px;
    width: 100%;
    height: 100%;
    z-index: -1;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, .08),
                0 0 2px 4px rgba(0, 0, 0, .012);
    background-color: rgba(0, 0, 0, .08);
  }

  &__wave {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 200px;
    height: 200px;
    z-index: -1;
    opacity: 0;
    outline: none;
    border-radius: 50%;
    box-shadow: 0 0 30px 40px rgba(0, 0, 0, .08),
                0 0 20px 10px rgba(0, 0, 0, .04),
                0 0 2px 12px rgba(0, 0, 0, .012) inset;
    transform: translate(-50%, -50%);

    &:nth-child(2) {
      animation-delay: 150ms;
    }

    &:nth-child(3) {
      animation-delay: 300ms;
    }
  }

  &--active {
    button {
      animation-name: thor;
      animation-timing-function: ease-out;
    }

    #{$root}__shadow {
      animation-name: thor-shadow;
      animation-timing-function: ease-out;
    }

    #{$root}__wave {
      animation-name: thor-wave;
      animation-timing-function: ease-in-out;
    }
  }
}

@keyframes thor-wave {
  from {
    transform: translate(-50%, -50%) scale3d(3, 3, 1);
  }
  15% {
    transform: translate(-50%, -50%) scale3d(3, 3, 1);
    opacity: .1;
  }
  25% {
    transform: translate(-50%, -50%) scale3d(.1, .1, 1);
    opacity: .8;
  }
  55% {
    transform: translate(-50%, -50%) scale3d(.1, .1, 1);
  }
  85% {
    transform: translate(-50%, -50%) scale3d(.1, .1, 1);
    opacity: 1;
  }
  to {
    transform: translate(-50%, -50%) scale3d(5.5, 5.5, 3);
    opacity: 0;
  }
}
@keyframes thor-shadow {
  from {
    transform: scale3d(1, 1, 1) rotateZ(0deg) translate3d(0, 0, 1px);
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, .08),
                0 0 1px 2px rgba(0, 0, 0, .012);
    top: 1px;
    left: 2px;
  }
  15% {
    transform: scale3d(3.5, 3.5, 4) rotateZ(0deg);
    box-shadow: 0 0 22px 13px rgba(0, 0, 0, .08),
                0 0 22px 40px rgba(0, 0, 0, .02);
    background-color: rgba(0, 0, 0, .09);
    top: 12px;
    left: 4px;
  }
  25% {
    transform: scale3d(3, 3, 3) rotateZ(0deg);
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, .08),
                0 0 20px 40px rgba(0, 0, 0, .012);
    top: 10px;
  }
  55% {
    transform: scale3d(3, 3, 3) rotateZ(0deg);
  }
  85% {
    transform: scale3d(3, 3, 3) rotateZ(720deg);
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, .08),
                0 0 20px 40px rgba(0, 0, 0, .012);
    background-color: rgba(0, 0, 0, .09);
    top: 10px;
    left: 4px;
  }
  to {
    transform: scale3d(1, 1, 1) rotateZ(720deg) translate3d(0, 0, 1px);
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, .08),
                0 0 1px 2px rgba(0, 0, 0, .012);
    background-color: rgba(0, 0, 0, .08);
    top: 1px;
    left: 2px;
  }
}
@keyframes thor {
  from {
    transform: scale3d(1, 1, 1) rotateZ(0deg) translate3d(0, 0, 1px);
  }
  15% {
    transform: scale3d(3.5, 3.5, 4) rotateZ(0deg);
  }
  25% {
    transform: scale3d(3, 3, 3) rotateZ(0deg);
  }
  55% {
    transform: scale3d(3, 3, 3) rotateZ(0deg);
  }
  85% {
    transform: scale3d(3, 3, 3) rotateZ(720deg);
  }
  to {
    transform: scale3d(1, 1, 1) rotateZ(720deg) translate3d(0, 0, 1px);
  }
}
</style>
