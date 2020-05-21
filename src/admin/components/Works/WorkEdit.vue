<template lang="pug">
  .work-edit.card
    form(
      @submit.prevent="submit"
      @reset.prevent="hide"
    )
      .form__container
        .form__header {{formTitle}}
        hr.divider
        .form__content
          .form__content-wrap
            .form__col
              .form__image(v-if="tmpWork.photo")
                img(:src="image").form__image-pic
                .form__image-btn-wrap
                  button(
                    type="button"
                    @click="showInputFile"
                  ).form__image-btn Изменить превью
              .form__load-area(v-else :class="photoError")
                .form__load-text Перетащите либо загрузите изображение
                .form__load-btn
                  button(
                    type="button"
                    @click="showInputFile"
                  ).form__btn Загрузить
                .form__error-tooltip
                  InputTooltip(
                    :errorText="validationMessage('photo')"
                  )  
              input(
                type="file"
                accept=".png, .jpg, .jpeg"
                @change="appendFileAndRenderPhoto"
              )#upload-pic.form__load-file    
            .form__col
              .form__block
                CustomInput(
                  title="Название"
                  v-model="tmpWork.title"
                  :errorText="validationMessage('title')"
                )
              .form__block
                CustomInput(
                  title="Ссылка"
                  v-model="tmpWork.link"
                  :errorText="validationMessage('link')"
                )
              .form__block
                CustomInput(
                  title="Описание"
                  field-type="textarea"
                  v-model="tmpWork.description"
                  :errorText="validationMessage('description')"
                )
              .form__block
                CustomInput(
                  title="Добавление тэга"
                  v-model="tmpWork.techs"
                  :errorText="validationMessage('techs')"
                )
              ul.tags__list
                li.tags__item(
                  v-for="(tag, ndx) in tags"
                  :key="ndx")
                  .tag
                    span {{ tag }}
                    button(
                      type="button"
                      @click="delTag(ndx)"
                    ).tag__remove-btn
                      Icon(
                        iconName="cross"
                        className="tag__remove-icon"
                      )
        .form__btns(:class="{ 'blocked': isBlocked }")
          button(
            type="reset"
            :disabled="isBlocked"
          ).form__btn.form__btn--plain Отмена          
          button(
            type="submit"
            :disabled="isBlocked"            
          ).form__btn.form__btn--big {{btnTitle}}          
</template>
<script>
import { mapActions } from 'vuex'
import Icon from '../partial/Icon'
import CustomInput from '../partial/CustomInput'
import InputTooltip  from '../partial/InputTooltip'
import { required, minLength, url } from 'vuelidate/lib/validators'
export default {
  props: {
    work: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  components: {
    Icon,
    CustomInput,
    InputTooltip
  },

  data() {
    return {
      tags: [],
      image: null,
      tmpWork: {
        link: "",
        title: "",
        techs: "",
        photo: "",
        description: ""
      },
      isBlocked: false
    }
  },

  validations: {
    tmpWork:{
      title: {
        required,
        minLength: minLength(6)
      },
      link: {
        required,
        url
      },
      techs: {
        required,
        minLength: minLength(2)
      },
      photo: {
        required
      },
      description: {
        required,
        minLength: minLength(15)
      }
    }
  },

  computed: {
    formTitle() {
      return `${this.work.id ? 'Редактирование' : 'Добавление'} работы`
    },

    btnTitle() {
      return this.work.id ? 'Сохранить' : 'Загрузить'
    },

    photoError() {
      return !this.tmpWork.photo && this.validationMessage('photo') ? 'error' : ''
    }
  },
  
  watch: {
    'tmpWork.techs'() {
      this.tags = this.tmpWork.techs.split(',').map(tag =>tag.trim())
    }
  },
  
  created () {
    Object.assign(this.tmpWork, this.work)

    if (this.tmpWork.photo) {
      this.image = `https://webdev-api.loftschool.com/${this.tmpWork.photo}`
    }

    if (this.tmpWork.techs.length > 0) {
      this.tags = this.tmpWork.techs.split(',').map(tag =>tag.trim())
    }
  },

  methods: {
    ...mapActions('works', ['saveWork', 'updateWork']),
    
    showInputFile () {
      document.querySelector("#upload-pic").click()
    },

    delTag (index) {
      this.tags.splice(index, 1)
      this.tmpWork.techs = this.tags.join(',')
    },

    appendFileAndRenderPhoto (e) {
      this.tmpWork.photo = e.target.files[0]
      const reader = new FileReader()

      try {
        reader.readAsDataURL(this.tmpWork.photo)
        reader.onload = () => {
          this.image = reader.result
        }
      } catch (error) {
        console.log(error)
      }
    },

    async submit () {
      this.$v.$touch()
      if (!this.$v.$error) {
        try {
          this.isBlocked = true

          const isWorkChanged = Object.keys(this.tmpWork).some((key, value) => this.work[key] !== value)

          if (isWorkChanged) {
            this.tmpWork.id
              ? await this.updateWork(this.tmpWork)
              : await this.saveWork(this.tmpWork)
          }

          this.hide()
        } catch (error) {
          console.log(error)
        } finally {
          this.isBlocked = false
        }
      }
    },

    hide () {
      this.$emit('hide')
    },
    
    validationMessage (field) {
      const obj = this.$v.tmpWork[field]

      if (!this.$v.$error) return ''

      if (!obj.required) {
        return "Поле обязательно" 
      }
      
      if (field === 'link' && !obj.url) {
        return "Введите корректный url" 
      }

      if (field !== 'photo' && field !== 'link' && !obj.minLength) {
        return `Введите не меньше ${obj.$params.minLength.min} символов`
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .work-edit {
    width: 100%;
    margin-bottom: 30px;

    @include phones {
      margin-bottom: 10px;
    }
  }

  .form__container {
    padding: 30px 20px 30px 20px;

    @include phonesLg {
      padding: 30px 0 30px 0;
    }
  }

  .form__header {
    margin-bottom: 25px;
    font-size: 18px;
    font-weight: 700;
    padding-left: 10px;

    @include phonesLg {
      padding-left: 20px;
      font-size: 16px;
    }
  }

  .form__content {
    padding: 50px 10px 40px 10px;

    @include tablets {
      padding-top: 25px;
    }

    @include tablets {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  .form__content-wrap {
    display: flex;
    justify-content: space-between;

    @include tablets {
      flex-direction: column;
    }
  }

  .form__col {
    width: 50%;
    margin-right: 30px;
    display: flex;
    flex-direction: column;

    &:last-child {
      margin-right: 0;
    }

    @include tablets {
      width: 100%;
      padding: 0 12%;
      margin-right: 0;

      &:first-child {
        padding: 0 15%;
      }
    }

    @include phonesLg {
      padding: 0;
      &:first-child {
        padding: 0;
      }
    }
  }

  .form__btns {
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
  }

  .form__load-area {
    min-height: 276px;
    border: 1px dashed #a1a1a1;
    background-color: #dee4ed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    position: relative;

    @include tablets {
      margin-bottom: 55px;
    }

    &.error {
      border: 2px solid $errors-color;
    }
  }

  .form__load-file {
    display: none;
  }

  .form__load-text {
    text-align: center;
    margin-bottom: 20px;
    padding: 0 20%;
    font-weight: 600;
    opacity: .5;
    line-height: 2;
  }

  .form__load-btn {
    display: flex;
    justify-content: center;
  }

  .form__image {
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include tablets {
      margin-bottom: 55px;
    }
  }

  .form__image-pic {
    flex-shrink: 0;
    margin-bottom: 30px;
    max-height: 277px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  
  .form__image-btn-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form__image-btn {
    border: none;
    background: transparent;
    color: #383bcf;
    font-weight: 600;
    padding: 1px 0;

    &:hover {
      text-decoration: underline;
    }

    @include phonesLg {
      font-size: 14px;
    }
  }

  .form__block {
    flex: 1;
    margin-bottom: 30px;
  }

  .tags__list {
    display: flex;
    flex-wrap: wrap;
  }

  .tags__item {
    margin-right: 10px;
    margin-bottom: 5px;
  }

  .tag {
    font-size: 13px;
    font-weight: 600;
    padding: 8px 15px 8px 20px;
    border-radius: 20px;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
  }
  .tag__remove-btn {
    border: none;
    background: transparent;
    padding: 0;
    margin-left: 10px;
    display: flex;
  }

  .tag__remove-icon {
    height: 11px;
    width: 11px;
    fill: #414c63;
  }

  .form__error-tooltip {
    display: none;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
  }

  .error {
    .form__error-tooltip {
      display: block;
    }
  }
</style>