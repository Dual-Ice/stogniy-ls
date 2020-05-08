import Vue from "vue";

const skill = {
  template: "#skill",
  props: {
    name: String,
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
    skills: Object
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
      skills: [
        {
          "title": "Frontend",
          "skillGroup": {
            "HTML5": 30,
            "CSS3": 50,
            "JavaScript": 25,
            "VueJs": 30
          }
        },
        {
          "title": "Workflow",
          "skillGroup": {
            "GIT": 30,
            "Terminal": 60,
            "Gulp": 30,
            "Webpack": 75
          }
        }
      ]
    }
  }
})