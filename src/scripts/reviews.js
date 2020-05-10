import Vue from "vue";
import { Carousel, Slide } from 'vue-carousel';

const review = {
  template: "#review",
  props: {
    review: Object
  }
};

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
          occ: "Преподаватель Loftschool",
          "photo": "user2.jpg"
        },
        {
          id: 3,
          text: "Таким образом, постоянный количественный рост и сфера нашей активности напрямую зависит от форм воздействия.",
          author: "Иванов Иван",
          occ: "Заказчик сайта",
          photo: "user.jpg"
        },
        {
          id: 4,
          text: "С другой стороны рамки и место обучения кадров требует от нас системного анализа направлений прогрессивного развития.",
          author: "Петров Петр",
          occ: "Редактор журнала",
          photo: "user2.jpg"
        },
        {
          id: 5,
          text: "Равным образом повышение уровня гражданского сознания представляет собой интересный эксперимент проверки форм воздействия.",
          author: "Карпов Василий",
          occ: "Директор курорта",
          photo: "user.jpg"
        },
      ]
    }
  },

  created() {
    this.reviews = this.makeArrWithRequireImages(this.reviews)
  },
  
  methods: {
    slide(direction) {
      if (direction === 'next') {
        this.$refs.carousel.goToPage(this.$refs.carousel.getNextPage());
      } else {
        this.$refs.carousel.goToPage(this.$refs.carousel.getPreviousPage());
      }
      
      this.nextBtnDisable = !this.$refs.carousel.canAdvanceForward
      this.prevBtnDisable = !this.$refs.carousel.canAdvanceBackward
    },
    
    makeArrWithRequireImages(array) {
      return array.map((item) => {
        const requirePic = require(`../images/userfiles/${item.photo}`);
        item.photo = requirePic;
        return item;
      });
    },
  }

})