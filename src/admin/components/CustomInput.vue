<template lang="pug">
  label.input(
    v-if="fieldType === 'input'" 
    :class="[{'input_labeled' : !!title, 'no-side-paddings' : noSidePaddings}, iconClass, {'error' : !!errorText}]"
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
        @input="$emit('input', $event.target.value)"
      ).input__elem.field__elem
    .input__error-tooltip
      InputTooltip(
        :errorText="errorText"
      )

  label.textarea(
    v-else-if="fieldType === 'textarea'"
      :class="{'error' : !!errorText}"
  )
    .input__title(v-if="title") {{title}} 
    textarea.textarea__elem.field__elem(
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
    )
    .input__error-tooltip
      InputTooltip(
        :errorText="errorText"
      )
</template>

<script>
import Icon from "./Icon"
import InputTooltip  from "./InputTooltip"

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
    },
    errorText: {
      type: String,
      default: ""
    },
  },

  components: {
    Icon,
    InputTooltip
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
  @import url("../../styles/mixins.pcss");

  .input {
    display: block;
    position: relative;

    @include phonesLg {
      font-size: 14px; 
    }

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
        font-weight: 700;
        padding-top: 17px;
        padding-bottom: 17px;
      }
    }
  }

  .input__error-tooltip {
    display: none;
    position: absolute;
    top: 100%;
    left: 45%;
    transform: translateX(-50%);
    z-index: 100;
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
    font-weight: 600;
    color: $admin-font;

    &::placeholder {
      color: rgba(55, 62, 66, 0.25);
    }
  }

  .textarea__elem {
    height: 115px;
    padding: 20px;
    border: 1px solid rgba($text-color, 0.2);
    resize: none;
    font-weight: 600;
    margin-top: 10px;
    width: 100%;
    line-height: 30px;
  }
  
  .textarea {
    position: relative;

    @include phonesLg {
      font-size: 14px;
    }
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

  .error {
    .input__wrap {
      border-bottom: 2px solid $errors-color;
    }

    .input__icon {
      fill: $errors-color;
      opacity: 1;
    }

    .textarea__elem {
      border: 2px solid $errors-color;
    }

    .input__error-tooltip {
      display: block;
    }
  }
</style>