import Vue from "vue";

const sliderBtns = {
  template: "#slider-btns",
  props: {
    currentIndex: Number,
    worksCount: Number
  },
  computed: {
    prevBtnDisable () {
      return this.currentIndex === 0
    },
    nextBtnDisable () {
      return (this.currentIndex + 1) === this.worksCount
    }
  }
};

const sliderPreviews = {
  template: "#slider-previews",
  props: {
    works: Array,
    currentWork: Object
  }
};

const sliderImages = {
  template: "#slider-images",
  components: {
    sliderPreviews,
    sliderBtns
  },
  props: {
    works: Array,
    currentWork: Object,
    currentIndex: Number
  },
  computed: {
    reversedWorks () {
      return [...this.works].reverse()
    },

    currentImageIndex () {
      return this.currentIndex + 1
    }
  }
};

const sliderTags = {
  template: "#slider-tags",
  props: {
    tags: Array
  }
};

const sliderData = {
  template: "#slider-data",
  components: {
    sliderTags
  },
  props: {
    currentWork: Object
  },

  computed: {
    tagsArray () {
      return this.currentWork.skills.split(", ");
    }
  }
};

new Vue({
  el: "#works-component",
  template: "#works-slider",
  components: {
    sliderImages,
    sliderData
  },

  data() {
    return {
      currentIndex: 0,
      test: [1,2,3,4,5],
      works: [
        {
          "id": 1,
          "title": "Сайт об экстримальном отдыхе",
          "skills": "Html, Css, JavaScript",
          "image": "1.jpg",
          "link": "//google.com",
          "desc": "Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 2 месяца только самых тяжелых испытаний и бессонных ночей!"
        },
        {
          "id": 2,
          "title": "Сайт небольшого города",
          "skills": "Pug, PostCss, VueJS",
          "image": "2.jpg",
          "link": "//yandex.ru",
          "desc": "Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности требует от нас анализа форм воздействия. "
        },
        {
          "id": 3,
          "title": "Сайт автомобильного журнала",
          "skills": "Laravel, Saas, React",
          "image": "3.jpg",
          "link": "//rambler.ru",
          "desc": "Дорогие друзья, повышение уровня гражданского сознания играет важную роль в формировании существующих финансовых и административных условий."
        },
        {
          "id": 4,
          "title": "Сайт уютного дома на озере",
          "skills": "Php, Less, Angular",
          "image": "4.jpg",
          "link": "//mail.ru",
          "desc": "Равным образом повышение уровня гражданского сознания требует от нас системного анализа существующих финансовых и административных условий?"
        },
        {
          "id": 5,
          "title": "Сайт школы онлайн образования",
          "skills": "Html, Css, JQuery",
          "image": "5.jpg",
          "link": "//lenta.ru",
          "desc": "Задача организации, в особенности же консультация с профессионалами из IT играет важную роль в формировании соответствующих условий..."
        }
      ]
    }
  },

  computed: {
    currentWork () {
      // return this.works[this.currentIndex]
      return this.works[0]
    }
  },

  created() {
    this.works = this.makeArrWithRequireImages(this.works)
    console.l
  },

  methods: {
    makeArrWithRequireImages(array) {
      return array.map((item) => {
        const requirePic = require(`../images/content/works/${item.image}`);
        item.image = requirePic;
        return item;
      });
    },

    changeSlide (direction) {
      // this.currentIndex = direction === "next"
      //   ? this.currentIndex + 1
      //   : this.currentIndex - 1

      if (direction === "next") {
        this.currentIndex++
        this.moveElement(this.currentIndex)
      } else {
        this.moveElement(this.currentIndex)
        this.currentIndex--
      }
    },

    moveElement(index) {
      const removed = this.works.splice(index, 1)
      const zero = this.works.splice(0, 1)

      this.works.splice(index-1, 0, zero[0])
      this.works.splice(0, 0, removed[0])
    },

    goToSlide (slideId) {
      this.currentIndex = slideId - 1
      this.moveElement(this.works.findIndex(work => work.id === slideId))
    }
  }
})