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
  computed: {
    reversedWorks () {
      return [...this.works].reverse()
    },

    currentImageIndex () {
      return this.currentIndex + 1
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
        return works.map(work => {
          work.photo = 'https://webdev-api.loftschool.com/' + work.photo
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

    goToSlide (slideId) {
      this.currentIndex = slideId - 1
      this.moveElement(this.works.findIndex(work => work.id === slideId))
    }
  }
})