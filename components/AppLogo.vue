<template>
  <div class="VueToNuxtLogo">
    <div class="face face--one">😨</div>
    <div class="face face--two">😞</div>
    <div class="face face--three">😲</div>
  </div>
</template>

<style lang="scss">
.VueToNuxtLogo {
  display: inline-block;
  animation: turn 2s linear forwards 1s;
  transform: rotateX(180deg);
  position: relative;
  overflow: hidden;
  height: 240px;
  width: 245px;
}

.face {
  font-size: 120px;
  position: absolute;
  top: 60px;
  left: 60px;
  width: 0;
  height: 0;

  &--one {
    animation: goleft 0.5s linear forwards 3.5s;
  }
  &--two {
    animation: goright 0.5s linear forwards 3.5s;
  }
  &--three {
    animation: gotop 0.5s linear forwards 3.5s;
  }
}

@keyframes turn {
  100% {
    transform: rotateX(0deg);
  }
}

@keyframes goleft {
  100% {
    top: 90px;
    left: 0;
  }
}
@keyframes gotop {
  100% {
    top: 0;
  }
}
@keyframes goright {
  100% {
    top: 90px;
    left: 120px;
  }
}
</style>
