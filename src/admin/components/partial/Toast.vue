<template lang="pug">
  .toast-container(:class="{ showed: showed }")
    .toast(:class="'toast--' + type")
      .toast__text {{ message }}
      button(@click="setVisibility(false)").toast__close
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState(
      'toast', 
      [
        'type',
        'showed',
        'message'
      ]
    )
  },

  watch: {
    showed (value) {
      if (value) {
        let timeout
        clearTimeout(timeout)
        timeout = setTimeout(() => this.setVisibility(false), 3000)
      }
    }
  },

  methods: {
    ...mapMutations('toast', ['setVisibility'])
  }
}
</script>
<style lang="postcss">
  @import '../../../styles/mixins.pcss';

  .toast {
    &-container {
      width: 100%;
      display: flex;
      justify-content: center;
      position: fixed;
      bottom: -100%;
      left: 50%;
      transform: translateX(-50%);
      visibility: hidden;
      transition: 0.3s;

      &.showed {
        bottom: 0;
        visibility: visible;
      }
    }

    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    width: 100%;
    max-width: 400px;
    background: #4bb133;
    padding: 28px 20px 28px 30px;

    @include phones {
      max-width: 100%;
    }

    &__close {
    }

    &--warning {
      background: #b18333;
    }

    &--error {
      background: #b13333;
    }
  }

  .toast__text {
    font-size: 18px;
    font-weight: 600;
  }

  .toast__close {
    width: 20px;
    height: 20px;
    background: svg-load('cross.svg', fill=#fff) center center no-repeat;
    cursor: pointer;
    margin-left: 20px;
  }
</style>