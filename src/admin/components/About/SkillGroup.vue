<template lang="pug">
  .skill-group.card
    .skill-group__header
      .skill-group__header-value(v-if="!editMode")
        .skill-group__header-title {{value.title}}
        CardBtn(icon="edit").form-btn
      .skill-group__header-form(v-else)
        form
          .add-group-wrap
            .form__block-field 
              input(v-model="value.title" placeholder="Название новой группы").form__block-input
            .form__btns  
              CardBtn(icon="confirm").form-btn.form-btn--colored
              CardBtn(icon="delete").form-btn.form-btn--colored 
      hr.divider
    .skill-group__content
      ul.skill-group__list
        li(
          v-for="skill in value.skills"
          :key="skill.id"
        ).skill-group__item
          Skill(
            :skill="skill"
          )
    .skill-group__add-item
      form.add-skill-wrap
        .form__block-field 
          input(placeholder="Новый навык").form__block-input
        .form__block-field 
          input(placeholder="100 %").form__block-input
        button.add-new-btn
</template>
<script>
import Skill from "./Skill"
import CardBtn from "../CardBtn"
export default {
  components: {
    Skill,
    CardBtn
  },

  props: {
    value: Object
  },

  data () {
    return {
      editMode: true
    }
  }
}
</script>
<style lang="postcss" scoped>
  .skill-group {
    width: 100%;
    height: 400px;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .skill-group__header-value {
    display: flex;
    margin-bottom: 30px;
    padding: 10px 10px 0 10px;
    justify-content: space-between;
  }

  .skill-group__header-form {
    padding: 10px 10px 0 10px;
    margin-bottom: 15px;
  }

  .skill-group__header-title {
    font-size: 18px;
    font-weight: 600;
  }

  .skill-group__content {
    padding: 30px 10px 0 10px;
  }

  .skill-group__list {
    display: flex;
    flex-direction: column;
  }

  .skill-group__item {
    display: flex;
    margin-bottom: 25px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .skill-group__add-item {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    margin-bottom: 35px;
    padding-right: 10px;

  }

  .add-skill-wrap,
  .add-group-wrap {
    display: flex;
  }

  .add-skill-wrap {
    width: 79%;
    .form__block-field {      
      &:nth-child(1) {
        margin-right: 10px;
        width: 58%;
      }

      &:nth-child(2) {
        width: 20%;
        margin-right: 30px;
      }

      .form__block-input {
        margin-bottom: 0;
      }
    }
  }

  .add-group-wrap {
    justify-content: space-between;
    .form__block-field {
      width: 60%;
    }
  }

  .form__btns {
    display: flex;
  }

  .form-btn {
    filter: grayscale(1) brightness(2.5);

    &:hover {
      filter: none;
    }

    &:first-child  {
      margin-right: 20px;
    }

    &--colored {
      filter: none;
    }
  }

  .form__block-field {
    display: flex;
    border-bottom: 1px solid currentColor;

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

    &::placeholder {
      padding-left: 5%;
      padding-bottom: 15px;
      opacity: .5;
    }
  }

    .blocked {
      opacity: 0.5;
      filter: grayscale(100%);
      pointer-events: none;
      user-select: none;
    }
</style>