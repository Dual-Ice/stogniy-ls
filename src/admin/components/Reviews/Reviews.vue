<template lang="pug">
  .reviews
    .reviews__header
      .container
        h1.page-title.reviews__title Блок «Отзывы»
    .reviews__content
      .container.reviews__container
        ReviewEdit(
          v-if="showAddReview"
          :review="review"
          @hide="hideAddReview"
        )

        ul.reviews__list
          li.reviews__item
            AddBtn(
              text="Добавить отзыв"
              size="plain"
              @click="showAddReview = true")
          li.reviews__item(
            v-for="review in reviews"
            :key="review.id"
          )
            review(
              :review="review"
              @edit="editReview"
            )
</template>
<script>
import Review from './Review'
import ReviewEdit from './ReviewEdit'
import AddBtn from '../partial/AddBtn'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    AddBtn,
    Review,
    ReviewEdit
  },

  data () {
    return {
      review: {
        author: '',
        occ: '',
        text: '',
        photo: null
      },
      showAddReview: false
    }
  },

  computed: {
    ...mapState('reviews', ['reviews']),
    ...mapState('auth', ['user'])
  },
  
  beforeRouteLeave (to, from, next) {
    this.showAddReview = false
    next()
  },

  created() {
    this.loadReviews(this.user.id)
  },

  methods: {
    ...mapActions('reviews', ['loadReviews']),
    
    hideAddReview () {
      this.showAddReview = false
      this.review = {
        author: '',
        occ: '',
        text: '',
        photo: null
      }
    },

    editReview (review) {
      Object.assign(this.review, review)
      this.showAddReview = true
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