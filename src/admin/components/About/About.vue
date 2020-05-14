<template lang="pug">
  .about
    .about__header
      .container
        h1.page-title.about__title Блок «Обо мне»
        button.add-new-btn.add-new-btn--small Добавить группу 
    .about__content
      .container
        ul.skill-group__list
          //- li.skiil-group__item
          //-   SkillGroupAddEdit()
          li(
            v-for="skillGroup in skillGroups"
            :key="skillGroup.id"
          ).skill-group__item
            SkillGroup(
              :value="skillGroup"
            )
</template>
<script>
import SkillGroup from "./SkillGroup"
import SkillGroupAddEdit from "./SkillGroupAddEdit"
export default {
  components: {
    SkillGroup,
    SkillGroupAddEdit
  },

  data () {
    return {
      skillGroups: [
        {
          "id": 1,
          "title": "Frontend",
          "skills": [
            {
              "id": 1,
              "title": "HTML5",
              "percent": 100
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
  
}
</script>
<style lang="postcss" scoped>

  .about__header {
    margin-bottom: 60px;
    
    .page-title {
      margin-bottom: 0;
    }

    .container {
      display: flex;
    }
  }

  .about__title {
    margin-right: 60px;
  }

  
  .skill-group__list {
    display: flex;
    margin-left: -30px;
    flex-wrap: wrap;
  }

  .skill-group__item {
    width: calc(100% / 2 - 30px);
    margin-left: 30px;
    margin-bottom: 30px;
    display: flex;
  }

</style>