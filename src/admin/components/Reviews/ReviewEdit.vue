<template lang="pug">
  .review-edit.card
    form(
      @submit.prevent="submit"
      @reset.prevent="hide"
    )
      .form__container
        .form__header {{formTitle}}
        hr.divider
        .form__content
          .form__content-wrap
            .form__avatar(:class="photoError")
              label.form__avatar-upload
                input(
                  type="file"
                  @change="appendFileAndRenderPhoto"
                ).form__avatar-file
                .form__avatar-wrap
                  img(
                    v-if="tmpReview.photo"
                    :src="image"
                  ).form__avatar-img
                  Icon(
                    v-else
                    iconName="user"
                    className="form__avatar-empty-icon"
                  )
                .form__load-text {{`${tmpReview.photo ? 'Изменить' : 'Добавить'} фото`}}
                .form__error-tooltip
                  InputTooltip(
                    :errorText="validationMessage('photo')"
                  )
            .form__review
              .form__row
                .form__block
                  CustomInput(
                    title="Имя автора"
                    v-model="tmpReview.author"
                    :errorText="validationMessage('author')"
                  )
                .form__block  
                  CustomInput(
                    title="Титул автора"
                    v-model="tmpReview.occ"
                    :errorText="validationMessage('occ')"
                  )
              .form__row    
                .form__block
                  CustomInput(
                    title="Отзыв"
                    field-type="textarea"
                    v-model="tmpReview.text"
                    :errorText="validationMessage('text')"
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
import Icon from '../partial/Icon'
import { mapActions, mapMutations } from 'vuex'
import CustomInput from '../partial/CustomInput'
import InputTooltip  from '../partial/InputTooltip'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  props: {
    review: {
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

  data () {
    return {
      image: null,
      tmpReview: {
        author: "",
        occ: "",
        photo: "",
        text: ""
      },
      isBlocked: false
    }
  },

  validations: {
    tmpReview:{
      author: {
        required,
        minLength: minLength(4)
      },
      occ: {
        required,
        minLength: minLength(6)
      },
      photo: {
        required
      },
      text: {
        required,
        minLength: minLength(6)
      }
    }
  },
  
  computed: {
    formTitle() {
      return `${this.review.id ? 'Редактировать' : 'Добавить'} отзыв`
    },

    btnTitle() {
      return this.review.id ? 'Сохранить' : 'Загрузить'
    },

    photoError() {
      return !this.tmpReview.photo && this.validationMessage('photo') ? 'error' : ''
    }
  },

  created () {
    Object.assign(this.tmpReview, this.review)

    if (this.tmpReview.photo) {
      this.image = this.tmpReview.photo
    }
  },

  methods: {
    ...mapActions('reviews', ['saveReview', 'updateReview']),
    ...mapMutations('toast', ['showToast']),

    appendFileAndRenderPhoto (e) {
     this.tmpReview.photo = e.target.files[0]
      const reader = new FileReader();

      try {
        reader.readAsDataURL(this.tmpReview.photo)
        reader.onload = () => {
          this.image = reader.result
        }
      } catch (error) {
        this.showToast(
          {
            type: 'error',
            message: 'Ошибка при чтении файла'
          }
        )
      }
    },

    hide () {
      this.$emit('hide')
    },

    async submit () {
      this.$v.$touch()
      if (!this.$v.$error) {
        try {
          this.isBlocked = true

          const isReviewChanged = Object.keys(this.tmpReview).some((key, value) => this.review[key] !== value)

          if (isReviewChanged) {
            this.tmpReview.id
              ? await this.updateReview(this.tmpReview)
              : await this.saveReview(this.tmpReview)
          }

          this.hide()
        } catch (error) {
          this.showToast( { type: 'error', message });
        } finally {
          this.isBlocked = false
        }
      }
    },

    validationMessage (field) {
      const obj = this.$v.tmpReview[field]

      if (!this.$v.$error) return ''

      if (!obj.required) {
        return "Поле обязательно" 
      }
      if (field !== 'photo' && !obj.minLength) {
        return `Введите не меньше ${obj.$params.minLength.min} символов`
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
  @import url("../../../styles/mixins.pcss");

  .review-edit {
    width: 100%;
    margin-bottom: 30px;

    @include phones {
      margin-bottom: 10px;
    }
  }

  .form__container {
    width: 78%;
    padding: 30px 0 50px 20px;

    @include tabletsLg {
      width: 100%;
      padding: 30px 20px 50px 20px;
    }

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
    }
  }

  .form__content {
    padding: 50px 0 30px 10px;
    
    @include tabletsLg {
      padding: 50px 10px 30px 10px;
    }

    @include phonesLg {
      padding: 30px 20px;
    }
  }

  .form__content-wrap {
    display: flex;

    @include tablets {
      flex-direction: column;
    }
  }

  .form__avatar {
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    @include tablets {
      margin-right: 0;
      margin-bottom: 45px;
    }
  }

  .form__avatar-upload {
    cursor: pointer;

    &:hover {
      .form__load-text {
        text-decoration: underline;
      }
    }
  }

  .form__avatar-file {
    display: none;
  }

  .form__avatar-wrap {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #dee4ed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-bottom: 30px;
    overflow: hidden;
  }

  .form__avatar-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .form__avatar-empty-icon {
    height: 113px;
    width: 113px;
    fill: $white;
  }

  .form__load-text {
    color: #383bcf;
    font-weight: 600;
    text-align: center;
  }

  .form__review {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .form__btns {
    display: flex;
    justify-content: flex-end;

    @include phonesLg {
      padding-right: 20px;
    }
  }

  .form__row {
    display: flex;
    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }

    @include tablets {
      flex-direction: column;
    }
  }

  .form__block {
    flex: 1;
    margin-right: 30px;
    
    &:last-child {
      margin-right: 0;
    }

    @include tablets {
      margin-right: 0;

      &:not(:last-child) {
        margin-bottom: 40px;
      }
    }
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
    .form__avatar-wrap {
      border: 2px solid $errors-color;
    }
    
    .form__error-tooltip {
      display: block;
    }
  }
</style>