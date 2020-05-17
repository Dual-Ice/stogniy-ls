<template lang="pug">
  button(
    :class="[className, noMargin]"
    v-on="$listeners"
  ).btn {{title}}
</template>
<script>
export default {
  props: {
    title: String,
    icon: String
  },

  computed: {
    className() {
      return `btn--${this.icon}`
    },

    noMargin() {
      return  this.title ? "" : "btn--empty-after-margin"
    }
  }
}
</script>
<style lang="postcss" scoped>
  .btn {
    color: rgba(#414c63, .7);
    border: none;
    background: transparent;
    font-weight: 600;
    padding: 0;
    display: flex;
    align-items: center;

    &:after {
      width: 15px;
      height: 15px;
      content: "";
      margin-left: 10px;
      display: inline-block;
    }

    &--edit {
      &:after {
        background: svg-load('pencil.svg', fill=$links-color, width=100%, height=100%) center center no-repeat;
      }
    }

    &--remove {
      &:after {
        background: svg-load('remove.svg', fill=#c92e2e, width=100%, height=100%) center center no-repeat;
      }
    }

    &--delete {
      &:after {
        background: svg-load('cross.svg', fill=#bf2929, width=100%, height=100%) center center no-repeat;
      }
    }

    &--confirm {
      &:after {
        background: svg-load('tick.svg', fill=#00d70a, width=100%, height=100%) center center no-repeat;
      }
    }

    &--trash {
      &:after {
        background: svg-load('trash.svg', fill=#bf2929, width=100%, height=100%) center center no-repeat;
      }
    }

    &--empty-after-margin {
      width: 15px;
      height: 15px;

      &:after {
        margin-left: 0;
      }
    }
  }
</style>