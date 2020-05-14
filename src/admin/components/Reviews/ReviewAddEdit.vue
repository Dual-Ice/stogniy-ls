<template lang="pug">
  .review-add-edit.card
    form
      .form__container
        .form__header {{formTitle}}
        hr.divider
        .form__content
          .form__content-wrap
            .form__avatar
              .form__avatar-wrap
                img(
                  v-if="review.photo"
                ).form__avatar-img 
                svg(
                  v-else
                  class="empty-user-icon"
                  :viewBox="userIcon.viewBox"
                  preserveAspectRatio="none")
                  use(:xlink:href="userIcon.url")
              button.form__load-btn Добавить фото
            .form__review
              .form__row
                label.form__block
                  .form__block-label Имя автора
                  .form__block-field 
                    input.form__block-input
                label.form__block
                  .form__block-label Титул автора
                  .form__block-field 
                    input.form__block-input
              .form__row      
                label.form__block.form__block--textarea  
                  .form__block-label Отзыв
                  .form__block-field
                    textarea(rows=3).form__block-input.form__block-textarea
        .form__btns
          button.form__btn.form__btn--plain Отмена          
          button.form__btn.form__btn--big Загрузить          
</template>
<script>
export default {
  props: {
    review: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      userIcon: null
    }
  },
  
  computed: {
    formTitle() {
      return `${this.review.id ? 'Редактировать' : 'Добавить'} отзыв`
    },

    btnTitle() {
      return this.review.id ? 'Сохранить' : 'Загрузить'
    }
  },


  created () {
    this.userIcon = require('../../../images/icons/user.svg').default;
  }
}
</script>
<style lang="postcss" scoped>
  .review-add-edit {
    width: 100%;
    margin-bottom: 30px;
  }

  .form__container {
    width: 78%;
    padding: 20px 0 50px 20px;
  }

  .form__header {
    margin-bottom: 25px;
    font-size: 18px;
    font-weight: 700;
    padding-left: 10px;
  }

  .form__content {
    padding: 50px 0 0 10px;
    margin-bottom: 30px;
  }

  .form__content-wrap {
    display: flex;
  }

  .form__avatar {
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
  }

  .empty-user-icon {
    height: 113px;
    width: 113px;
    fill: $white;
  }

  .form__load-btn {
    color: #383bcf;
    font-weight: 600;
    padding: 0;
    border: none;
    background: transparent;
  }

  .form__review {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .form__btns {
    display: flex;
    justify-content: flex-end;
  }

  .form__row {
    display: flex;
    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .form__block {
    flex: 1;
    margin-right: 30px;
    border-bottom: 1px solid currentColor;
    
    &:last-child {
      margin-right: 0;
    }

    &:hover,
    &:focus {
      border-color: $main;
    }

    &--textarea {
      border: none;

      .form__block-input {
        margin-bottom: 0;
      }
    }
  }

  .form__block-label {
    opacity: .5;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .form__block-input {
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
    line-height: 1.2;
  }

  .form__block-field {
    flex: 1;
    display: flex;

    &:focus-within {
      outline: rgb(77, 144, 254) auto 0.0625em;
    }
  }

  .form__block-textarea {
    resize: none;
    line-height: 30px;
    border: 1px solid rgba(currentColor, .2);
    padding: 20px;
  }
</style>