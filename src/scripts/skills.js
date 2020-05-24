import Vue from 'vue'
import request from './request'

const skill = {
  template: "#skill",
  props: {
    title: String,
    percent: Number
  },

  mounted() {
    this.coloringCircle();
  },

  methods: {
    coloringCircle() {
      const circle = this.$refs["skill-percents"];
      const dashArray = parseInt(
        getComputedStyle(circle).getPropertyValue("stroke-dasharray")
      );
      const percent = (dashArray / 100) * (100 - this.percent);

      circle.style.strokeDashoffset = percent;
    }
  }
};

const skillsRow = {
  template: "#skills-row",
  components: {
    skill
  },
  props: {
    skillGroup: Object
  }
};

new Vue({
  el: "#skills-component",
  template: "#skills-list",
  components: {
    skillsRow
  },
  
  data() {
    return {
      skillGroups: []
    }
  },

  mounted() {
    request('get', 'categories/320')
      .then(skillGroups => this.skillGroups = skillGroups)
  }
})