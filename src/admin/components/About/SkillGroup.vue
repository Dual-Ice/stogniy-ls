<template lang="pug">
  .skill-group.card
    .skill-group__header
      .skill-group__header-value(v-if="!editMode")
        .skill-group__header-title {{tmpGroup.title}}
        CardBtn(
          icon="edit" 
          type="button"
          @click="switchEdit"
        ).btn
      .skill-group__header-form(v-else)
        form(@submit.prevent="saveGroup").add__form.add__form--group
          .add__form-wrap
            .add__form-field
              CustomInput(
                v-model="tmpGroup.title"
                placeholder="Название новой группы"
                :errorText="validationMessage('tmpGroup', 'title')"
              )
            .add__form-btns.add__form-btns--colored
              CardBtn(
                icon="confirm"
                type="submit"
              ).btn
              CardBtn(
                icon="delete"
                type="button"
                @click="switchEdit"
              ).btn 
      hr.divider
    .skill-group__content
      ul.skill-group__list
        li(
          v-for="skill in tmpGroup.skills"
          :key="skill.id"
        ).skill-group__item
          Skill(
            :skill="skill"
          )
    .skill-group__add-item(:class="blockAdding")
      form.add__form.add__form--skill(@submit.prevent="addSkill")
        .add__form-wrap
          .add__form-field 
            CustomInput(
              v-model="newSkill.title"
              placeholder="Новый навык"
              :errorText="validationMessage('newSkill', 'title')"
            )
          .add__form-field 
            CustomInput(
              v-model="newSkill.percent"
              placeholder="100 %"
              :errorText="validationMessage('newSkill', 'percent')"
            )
          AddBtn(type="submit")
</template>
<script>
import Skill from "./Skill"
import AddBtn from "../AddBtn"
import CardBtn from "../CardBtn"
import CustomInput from "../CustomInput"
import { required, minLength, numeric, maxValue } from 'vuelidate/lib/validators'
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
      editMode: false,
      tmpGroup: {...this.value},
      newSkill: {
        title: '',
        percent: ''
      }
    }
  },

  validations () {
    let rules = {
      tmpGroup:{
        title: {
          required,
          minLength: minLength(6)
        }
      }
    }

    if (this.tmpGroup.id && !this.editMode) {
      rules.newSkill = {
          title: {
          required,
          minLength: minLength(2)
        },

        percent: {
          required,
          numeric,
          maxValue: maxValue(100)
        }
      }
    }

    return rules
  },

  computed: {
    blockAdding () {
      return !this.tmpGroup.id ? 'blocked' : ''
    }
  },

  created() {
    if (!this.tmpGroup.id) {
      this.editMode=true
    }
  },

  methods: {
    switchEdit () {
      this.editMode = !this.editMode
      this.$v.tmpGroup.$reset()
    },
    
    validationMessage (object, field) {
      if (!this.$v[object]) return ''

      const obj = this.$v[object][field]

      if (!this.$v[object].$error) return ''

      if (!obj.required) {
        return "Поле обязательно" 
      }

      if (field !== 'percent' && !obj.minLength) {
        return `Введите не меньше ${obj.$params.minLength.min} символов`
      }

      if (field === 'percent') {

        if (!obj.numeric) {
          return `Введите только цифры`
        }
        
        if (!obj.maxValue) {
          return  `Значение не должно быть больше ${obj.$params.maxValue.max}`
        }
      }
    },

    saveGroup () {
      this.$v.tmpGroup.$touch()
      if (!this.$v.tmpGroup.$error) {
        this.switchEdit()
        this.tmpGroup.id =  Math.floor(Math.random() * Math.floor(100))
        console.log("All is ok: ", this.tmpGroup)
      }
    },

    addSkill () {
      this.$v.newSkill.$touch()
      if (!this.$v.newSkill.$error) {
        this.newSkill.id =  Math.floor(Math.random() * Math.floor(100))
        this.tmpGroup.skills = [...this.tmpGroup.skills, this.newSkill]
        this.newSkill = {
          title: '',
          percent: ''
        }
        this.$v.newSkill.$reset()
        console.log("All is ok: ", this.newSkill)
      }
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
    padding: 8px 0;

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
    &--group {
      .add__form-field {
        flex-basis: 60%;

        @include tablets {
          flex-basis: 70%;
        }
      }
    }

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
          &:nth-child(1) {
            margin-right: 10px;
            flex-basis: 58%;
          }

          &:nth-child(2) {
            flex-basis: 20%;
            margin-right: 30px;
            @include tablets {
              margin-right: 25px;
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
</style>