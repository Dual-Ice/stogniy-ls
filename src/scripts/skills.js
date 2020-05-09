import Vue from "vue";

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
      skillGroups: [
        {
          "id": 1,
          "title": "Frontend",
          "skills": [
            {
              "id": 1,
              "title": "HTML5",
              "percent": 30
            },
            {
              "id": 2,
              "title": "CSS3",
              "percent": 50
            },
            {
              "id": 3,
              "title": "JavaScript",
              "percent": 25
            },
            {
              "id": 4,
              "title": "VueJs",
              "percent": 30
            }
          ]
        },
        {
          "id": 2,
          "title": "Workflow",
          "skills": [
            {
              "id": 1,
              "title": "GIT",
              "percent": 45
            },
            {
              "id": 2,
              "title": "Terminal",
              "percent": 60
            },
            {
              "id": 3,
              "title": "Gulp",
              "percent": 30
            },
            {
              "id": 4,
              "title": "Webpack",
              "percent": 75
            }
          ]
        }
      ]
    }
  }
})