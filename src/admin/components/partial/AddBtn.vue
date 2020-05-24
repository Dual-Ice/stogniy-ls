<template lang="pug">
  button(
    v-if="size === 'plain'"
    v-on="$listeners"
    type="button"
  ).add-new-btn.add-new-btn--plain
    .add-new-btn__text {{text.split(' ').join('\n') }}
  button(
    v-else
    v-on="$listeners"
    :class="smallClass"
    v-bind="$attrs"
  ).add-new-btn {{text ? text : ''}}
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    }
  },

  computed: {
    smallClass () {
       return this.size ? 'add-new-btn--small' : ""
    }
  }
}
</script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .add-new-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: $links-color;
    font-weight: 600;
    padding: 0;
    border: none;
    font-size: 16px;

    @include tablets {
      font-size: 14px;
    }

    &:before {
      content: "";
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: svg-load('cross.svg', fill=$white, width=15px, height=15px, transform='rotate(45deg)') center center no-repeat, linear-gradient(to right, #006aed, #3f35cb);
      color: $white;
      flex-shrink: 0;
      flex-basis: 40px;
      font-size: 30px;
      line-height: 40px;
    } 

    &--small {
      &:before {
        content: "";
        background: svg-load('cross.svg', fill=$white, width=8px, height=8px, transform='rotate(45deg)') center center no-repeat, linear-gradient(to right, #006aed, #3f35cb);
        width: 20px;
        height: 20px;
        flex-basis: 20px;
        font-size: 18px;
        margin-right: 13px;
        line-height: 1;
      }
    }

    &--plain {
      flex: 1;
      min-height: 300px;
      background-image: linear-gradient(to right, #006aed 0%, #3f35cb 100%);

      @include phonesLg {
        min-height: 100px;
        padding: 30px 0 30px 20px;
        justify-content: flex-start;
      }

      &:before {
        display: none;
      }
    }
  }

  .add-new-btn__text {
    color: $white;
    font-size: 18px;
    font-weight: 700;
    line-height: 25px;
    white-space: break-spaces;

    
    @include phonesLg {
      display: flex;
      align-items: center;
      white-space: initial;

    }
    
    @include phones {
      font-size: 16px;
    }
    
    &:before {
      display: flex;
      content: '+';
      font-weight: 300;
      font-size: 72px;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 2px solid currentColor;
      margin-bottom: 30px;

      @include phonesLg {
        margin-bottom: 0;
        width: 50px;
        height: 50px;
        font-size: 24px;
        margin-right: 20px;
      }

    }
  }
</style>