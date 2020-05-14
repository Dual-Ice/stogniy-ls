<template lang="pug">
  .skill
    .skill__data(v-if="!editMode")
      .skill__title {{skill.title}}
      .skill__percent
        .skill__percent-value {{skill.percent}}
      .skill__btns
        CardBtn(icon="edit").skill__btn
        CardBtn(icon="trash").skill__btn
    .skill__data.skill__data--underline(v-else)
      .skill__title
        .form__block-field 
          input(type="text" v-model="skill.title").form__block-input
      .skill__percent
        .form__block-field 
          input(type="text" v-model="skill.percent").form__block-input
      .skill__btns
        CardBtn(icon="confirm").skill__btn.skill__btn--colored
        CardBtn(icon="delete").skill__btn.skill__btn--colored
</template>
<script>
import CardBtn from "../CardBtn"
export default {
  components: {
    CardBtn
  },
  
  props: {
    skill: Object
  },

  data () {
    return {
      editMode: false
    }
  }
}
</script>
<style lang="postcss" scoped>
  .skill {
    width: 100%;
  }

  .skill__data {
    display: flex;
    justify-content: space-between;

    &--underline {
      .skill__title,
      .skill__percent {
        border-bottom: 1px solid currentColor;
      }
    }
  }

  .skill__title {
    width: 56%;
    margin-right: 30px;
  }
  
  .skill__percent {
    width: 15%;
    display: flex;
    
    &:after {
      content: "%";
      display: inline-block;
      opacity: .7;
    }

    .form__block-input {
      margin-left: 10px;
    }
  }

  .skill__percent-value {
    margin-right: auto;
  }
  
  .skill__btns {
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .skill__btn {
    filter: grayscale(1) brightness(2.5);

    &:hover {
      filter: none;
    }

    &--colored {
      filter: none;
    }

    &:first-child {
      margin-right: 20px;
    }
  }

  .form__block-field {
    display: flex;
    /* border-bottom: 1px solid currentColor; */

    &:focus-within {
      outline: rgb(77, 144, 254) auto 0.0625em;
    }
  }

  .form__block-input {
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 1.2;
  }
</style>