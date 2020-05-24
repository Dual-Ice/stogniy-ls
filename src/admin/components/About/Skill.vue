<template lang="pug">
  .skill
    .skill__data(v-if="!editMode")
      .skill__title {{skill.title}}
      .skill__percent
        .skill__percent-value {{skill.percent}}
      .skill__btns
        CardBtn(
          icon="edit"
          type="button"
          @click="switchEdit"
        ).skill__btn
        CardBtn(
          icon="trash"
          type="button"
          @click="deleteSkill(skill)"
        ).skill__btn
    form(
      v-else 
      @submit.prevent="saveSkill"
    )
      .skill__data
        .skill__field 
          CustomInput(
            v-model="tmpSkill.title"
            :errorText="validationMessage('title')"
            :noSidePaddings="true"
          )
        .skill__field 
          CustomInput(
            v-model="tmpSkill.percent"
            :errorText="validationMessage('percent')"
            :noSidePaddings="true"
          )
        .skill__btns.skill__btns--colored
          CardBtn(
            type="submit"
            icon="confirm"
          ).skill__btn
          CardBtn(
            icon="delete" 
            type="button"
            @click="switchEdit"
          ).skill__btn
</template>
<script>
import { mapActions } from 'vuex';
import CardBtn from '../partial/CardBtn'
import CustomInput from '../partial/CustomInput'
import { required, minLength, numeric, maxValue } from 'vuelidate/lib/validators'

export default {
  components: {
    CardBtn,
    CustomInput
  },
  
  props: {
    skill: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data () {
    return {
      editMode: false,
      tmpSkill: {...this.skill}
    }
  },

  validations: {
    tmpSkill: {
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
  },

  methods: {
    ...mapActions(
      'categories',
      ['deleteSkill', 'updateSkill']
    ),

    switchEdit () {
      this.editMode = !this.editMode

      if (this.editMode) {
        this.tmpSkill = {...this.skill}
        this.$v.tmpSkill.$reset()
      }
    },

    validationMessage (field) {
      if (!this.$v.tmpSkill) return ''

      const obj = this.$v.tmpSkill[field]

      if (!this.$v.tmpSkill.$error) return ''

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

    async saveSkill () {
      this.$v.tmpSkill.$touch()
      if (!this.$v.tmpSkill.$error) {
        await this.updateSkill(this.tmpSkill);
        this.switchEdit()
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .skill {
    width: 100%;
  }

  .skill__data {
    display: flex;
    justify-content: space-between;

    .skill__field {
      &:nth-child(1) {
        flex-basis: 56%;
        margin-right: 10%;
      }
      &:nth-child(2) {
        flex-basis: 60px;
        margin-right: 30px;
        display: flex;
        align-items: center;
    
        &:after {
          content: "%";
          display: inline-block;
          opacity: .7;
        }
      }
    }

    &--underline {
      .skill__title,
      .skill__percent {
        border-bottom: 1px solid currentColor;
      }
    }

    @include phones {
      font-size: 14px;
    }
  }

  .skill__title {
    width: 56%;
    margin-right: 10%;
  }
  
  .skill__percent {
    display: flex;
    width: 60px;
    margin-right: 30px;
    
    &:after {
      content: "%";
      display: inline-block;
      opacity: .7;
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

    &--colored {
      .skill__btn {
        filter: none;
      }
    }
  }

  .skill__btn {
    filter: grayscale(1) brightness(2.5);
    transition: filter .3s ease-in;

    &:hover {
      filter: none;
    }

    &:first-child {
      margin-right: 25%;
    }
  }
</style>