<template lang="pug">
  .work-add-edit.card
    form
      .form__container
        .form__header {{formTitle}}
        hr.divider
        .form__content
          .form__content-wrap
            .form__col
              .form__load-area
                .form__load-text Перетащите либо загрузите изображение
                .form__load-btn
                  button.form__btn Загрузить
            .form__col
              label.form__block
                .form__block-label Название
                .form__block-field 
                  input.form__block-input
              label.form__block
                .form__block-label Ссылка
                .form__block-field 
                  input.form__block-input
              label.form__block.form__block--textarea  
                .form__block-label Описание
                .form__block-field
                  textarea(rows=4).form__block-input.form__block-textarea
              label.form__block
                .form__block-label Добавление тэга
                .form__block-field 
                  input.form__block-input
              ul.tags__list
                li.tags__item(
                  v-for="(tag, ndx) in tags"
                  :key="ndx")
                  .tag {{tag}}
        .form__btns
          button.form__btn.form__btn--plain Отмена          
          button.form__btn.form__btn--big Загрузить          
</template>
<script>
export default {
  props: {
    work: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      tags: ['html', 'css', 'vuejs']
    }
  },

  computed: {
    formTitle() {
      return `${this.work.id ? 'Редактирование' : 'Добавление'} работы`
    },

    btnTitle() {
      return this.work.id ? 'Сохранить' : 'Загрузить'
    }
  }
}
</script>
<style lang="postcss" scoped>
  .work-add-edit {
    width: 100%;
    margin-bottom: 30px;
  }

  .form__container {
    padding: 30px 20px 30px 20px;
  }

  .form__header {
    margin-bottom: 25px;
    font-size: 18px;
    font-weight: 700;
    padding-left: 10px;
  }

  .form__content {
    padding: 50px 10px;
  }

  .form__content-wrap {
    display: flex;
    justify-content: space-between;
  }

  .form__col {
    width: 50%;
    margin-right: 30px;
    display: flex;
    flex-direction: column;

    &:last-child {
      margin-right: 0;
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
  }

  .form__load-text {
    text-align: center;
    margin-bottom: 30px;
    padding: 0 20%;
  }

  .form__load-btn {
    display: flex;
    justify-content: center;
  }

  .form__block {
    flex: 1;
    margin-bottom: 30px;
    border-bottom: 1px solid currentColor;

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
    line-height: 1.25;
    border: 1px solid rgba(currentColor, .2);
    padding: 20px;
  }

  .tags__list {
    display: flex;
    flex-wrap: wrap;
  }

  .tags__item {
    margin-right: 10px;
  }

  .tag {
    padding: 8px 30px 8px 20px;
    border-radius: 20px;
    background-color: #f4f4f4;
  }
</style>