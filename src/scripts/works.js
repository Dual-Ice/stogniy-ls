import Vue from "vue"
import request from './request'

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
}

const sliderPreviews = {
  template: "#slider-previews",
  props: {
    works: Array,
    currentWork: Object
  }
}

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

  data () {
    return {
      windowWidth: 0
    }
  },
  computed: {
    reversedWorks () {
      const width = this.windowWidth
      if ((width >= 769 && width <= 992) || width >= 1201) {
        return [...this.works].splice(0, 4).reverse()
      } else {
        return [...this.works].splice(0, 3).reverse()
      }
    },

    currentImageIndex () {
      return this.currentIndex + 1
    }
  },

  created () {
    this.getWindowWidth()
    window.addEventListener('resize', () => this.getWindowWidth())
  },

  methods: {
    getWindowWidth () {
      this.windowWidth = document.querySelector('body').clientWidth;
    }
  }
}

const sliderTags = {
  template: "#slider-tags",
  props: {
    tags: Array
  }
}

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
      if (this.currentWork.techs) {
        return this.currentWork.techs.split(',').map(tag =>tag.trim())
      }

      return []
    }
  }
}

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
      works: []
    }
  },

  computed: {
    currentWork () {
      // return this.works[this.currentIndex]
      if (this.works.length) {
        return this.works[0]
      }

      return {}
    }
  },

  mounted() {
    request('get', 'works/320')
      .then(works => {
        return works.map((work, ndx) => {
          work.photo = 'https://webdev-api.loftschool.com/' + work.photo
          work.ndx = ndx
          return work
        })
      })
      .then(works => this.works = works)
  },

  methods: {
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

    goToSlide (ndx) {
      this.currentIndex = ndx
      this.moveElement(this.works.findIndex(work => work.ndx === ndx))
    }
  }
})