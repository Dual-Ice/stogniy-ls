<template lang="pug">
  label.input(
    v-if="fieldType === 'input'" 
    :class="[{'input_labeled' : !!title, 'no-side-paddings' : noSidePaddings},iconClass]"
  )
    .input__title(v-if="title") {{title}}
    .input__wrap
      Icon(
        v-if="icon"
        className="input__icon",
        :iconName="icon")
      input(
        v-bind="$attrs"
        :value="value" 
      ).input__elem.field__elem

  label.textarea(
    v-else-if="fieldType === 'textarea'"
  )
    .input__title(v-if="title") {{title}} 
    textarea.textarea__elem.field__elem(
      v-bind="$attrs"
      :value="value"
    )
</template>

<script>
import Icon from "./Icon"
export default {
  inheritAttrs: false,
  props: {
    title: String,
    noSidePaddings: Boolean,
    fieldType: {
      type: String,
      default: "input"
    },
    value: String | Number,
    icon: {
      type: String,
      default: ""
    }
  },

  components: {
    Icon
  },

  computed: {
    iconClass() {
      const iconName = this.icon;
      return iconName.length ? ` input_iconed input_icon-${iconName}` : "";
    }
  }
};
</script>

<style lang="postcss" scoped>

  .input {
    display: block;
    position: relative;

    &.no-side-paddings {
      .input__elem {
        padding-right: 0;
        padding-left: 0;
      }
    }

    &_labeled {
      .input__elem {
        padding: 15px 0 18px;
      }
    }

    &_iconed {
      .input__title {
        margin-left: 45px;
        margin-bottom: 13px;
      }

      .input__elem {
        padding-left: 20px;
        font-size: 18px;
        font-weight: bold;
        padding-top: 17px;
        padding-bottom: 17px;
      }
    }
  }

  .input__title {
    color: rgba(65, 76, 99, 0.5);
    font-weight: 600;
    opacity: 0.5;
  }

  .input__elem {
    width: 100%;
    padding: 10px 8%;
    border: none;
    outline: none;
    &::placeholder {
      color: rgba(55, 62, 66, 0.25);
    }
  }

  .textarea__elem {
    height: 150px;
    padding: 20px;
    border: 1px solid rgba($text-color, 0.2);
    resize: none;
    font-weight: 600;
    margin-top: 10px;
    width: 100%;
  }
  
  .textarea {
    position: relative;
  }

  .input__icon {
    width: 30px;
    height: 30px;
    fill: currentColor;
    opacity: .5;
    flex-shrink: 0;
  }

  .input__wrap {
    display: flex;
    align-items: center;
    border-bottom: 1px solid  #1f232d;
    
    &:focus-within {
      outline: rgb(77, 144, 254) auto 0.0625em;
    }
  }
</style>