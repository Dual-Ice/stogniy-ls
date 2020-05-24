import Vue from 'vue'
import request from './request'
import { Carousel, Slide } from 'vue-carousel'

const review = {
  template: "#review",
  props: {
    review: Object
  }
}

new Vue({
  el: "#reviews-component",
  template: "#reviews-content",
  components: {
    Carousel,
    Slide,
    review
  },
  
  data() {
    return {
      prevBtnDisable: true,
      nextBtnDisable: false,
      reviews: []
    }
  },

  mounted() {
    request('get', 'reviews/320')
      .then(reviews => {
        return reviews.map(review => {
          return (review.photo = 'https://webdev-api.loftschool.com/' + review.photo) && review
        })
      })
      .then(reviews => this.reviews = reviews)
  },
  
  methods: {
    slide(direction) {
      if (direction === 'next') {
        this.$refs.carousel.goToPage(this.$refs.carousel.getNextPage())
      } else {
        this.$refs.carousel.goToPage(this.$refs.carousel.getPreviousPage())
      }
      this.updateBtns()
    },

    updateBtns () {
      this.nextBtnDisable = !this.$refs.carousel.canAdvanceForward
      this.prevBtnDisable = !this.$refs.carousel.canAdvanceBackward
    }
  }

})