<template lang="pug">
  .reviews
    .reviews__header
      .container
        h1.page-title.reviews__title Блок «Отзывы»
    .reviews__content
      .container.reviews__container
        ReviewEdit()

        ul.reviews__list
          li.reviews__item
            AddBtn(
              text="Добавить отзыв"
              type="plain")
          li.reviews__item(
            v-for="review in reviews"
            :key="review.id"
          )
            review(
            :value="review")
</template>
<script>
import Review from "./Review"
import AddBtn from "../AddBtn"
import ReviewEdit from "./ReviewEdit"
export default {
  components: {
    AddBtn,
    Review,
    ReviewEdit
  },

  created() {
    this.reviews = this.makeArrWithRequireImages(this.reviews)
  },

  data () {
    return {
      reviews: [
        {
          id: 1,
          text: "Этот парень проходил обучение веб-разработке не где-то, а в Loftschool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!",
          author: "Ковальчук Дмитрий",
          occ: "Основатель Loftschool",
          photo: "user.jpg"
        },
        {
          id: 2,
          text: "Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах",
          author: "Владимир Сабанцев",
          occ: "Преподаватель",
          "photo": "user2.jpg"
        },
        {
          id: 3,
          text: "Таким образом, постоянный количественный рост и сфера нашей активности напрямую зависит от форм воздействия.",
          author: "Иванов Иван",
          occ: "Заказчик сайта",
          photo: "user.jpg"
        }
      ]
    }
  },

   methods: {
    makeArrWithRequireImages(array) {
      return array.map((item) => {
        const requirePic = require(`../../../images/userfiles/${item.photo}`);
        item.photo = requirePic;
        return item;
      });
    }
  }
  
}
</script>
<style lang="postcss" scoped>  
  @import "../../../styles/mixins.pcss";

  .reviews__container {
    display: flex;
    flex-direction: column;

    @include phonesLg {
      width: 100%;
    }
  }

  .reviews__list {
    display: flex;
    margin-left: -30px;
    flex-wrap: wrap;
  }

  .reviews__item {
    width: calc(100% / 3 - 30px);
    margin-left: 30px;
    margin-bottom: 30px;
    display: flex;

    @include tablets {
      width: calc(100% / 2 - 30px);
    }

    @include phonesLg {
      width: 100%;
    }

    @include phones {
      margin-bottom: 10px;
      
      &:last-child {
        margin-bottom: 25px;
      }
    }
  }
</style>