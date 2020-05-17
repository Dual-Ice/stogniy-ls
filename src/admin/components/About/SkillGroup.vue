<template lang="pug">
  .skill-group.card
    .skill-group__header
      .skill-group__header-value(v-if="!editMode")
        .skill-group__header-title {{value.title}}
        CardBtn(icon="edit" @click="switchEdit").btn
      .skill-group__header-form(v-else)
        form.add__form.add__form--group
          .add__form-wrap
            .add__form-field 
              input(v-model="value.title" placeholder="Название новой группы").add__form-input
            .add__form-btns.add__form-btns--colored
              CardBtn(icon="confirm").btn
              CardBtn(icon="delete" @click="switchEdit").btn 
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
      form.add__form.add__form--skill
        .add__form-wrap
          .add__form-field 
            input(placeholder="Новый навык").add__form-input
          .add__form-field 
            input(placeholder="100 %").add__form-input
          AddBtn
</template>
<script>
import Skill from "./Skill"
import AddBtn from "../AddBtn"
import CardBtn from "../CardBtn"
import CustomInput from "../CustomInput"
export default {
  components: {
    Skill,
    AddBtn,
    CardBtn,
    CustomInput
  },

  props: {
    value: Object
  },

  data () {
    return {
      editMode: false
    }
  },

  methods: {
    switchEdit () {
      this.editMode = !this.editMode
    }
  }
}
</script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .skill-group {
    width: 100%;
    min-height: 390px;
    padding: 20px;
    display: flex;
    flex-direction: column;

    @include phonesLg {
      padding: 20px 0
    }
  }

  .skill-group__header-value {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    padding: 10px 10px 0 10px;
    justify-content: space-between;

    @include phonesLg {
      padding: 10px 20px 0 20px;
    }
  }

  .skill-group__header-form {
    padding: 0 10px;
    margin-bottom: 15px;

    @include phonesLg {
      padding: 0 20px;
    }
  }

  .skill-group__header-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.2;

    @include phones {
      font-size: 16px;
    }
  }

  .skill-group__content {
    padding: 30px 10px 10px 10px;

    @include phonesLg {
      padding: 30px 20px 10px 20px;
    }
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
    margin-bottom: 10px;
    padding-right: 10px;

    @include tablets {
      padding-left: 10px;
    }

    @include phonesLg {
      padding: 0 20px
    }
  }

  .add__form {
    &--skill {
      width: 79%;

      @include tablets {
        width: 100%;
      }

      .add__form-wrap {
        align-items: initial;
        justify-content: initial;

        @include phonesLg {
          justify-content: space-between;
        }

        .add__form-field {
          display: flex;
          border-bottom: 1px solid currentColor;
          flex: initial;
          max-width: initial;

          &:nth-child(1) {
            margin-right: 10px;
            width: 58%;
          }

          &:nth-child(2) {
            width: 20%;
            margin-right: 30px;
            @include tablets {
              margin-right: 25px;
            }
          }

          .add__form-input {
            margin-bottom: 0;
            padding-left: 5%;

            &::placeholder {
              font-weight: 400;
            }
          }
        }
      }
    }
  }

  .add__form-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .add__form-field {
      max-width: 60%;
      flex: 1;

      @include tablets {
        max-width: 70%
      }
    }
  }

  .add__form-btns {
    display: flex;

    &--colored {
      .btn {
        filter: none;
      }
    }
  }

  .btn {
    filter: grayscale(1) brightness(2.5);

    &:hover {
      filter: none;
    }

    &:first-child  {
      margin-right: 20px;
    }
  }

  .add__form-field {
    display: flex;
    border-bottom: 1px solid currentColor;

    &:focus-within {
      outline: rgb(77, 144, 254) auto 0.0625em;
    }
  }

  .add__form-input {
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    padding: 10px 0;

    @include phones {
      font-size: 16px;
    }

    &::placeholder {
      padding-bottom: 15px;
      opacity: .5;

      @include tablets {
        font-size: 16px;
      }
    }
  }
</style>