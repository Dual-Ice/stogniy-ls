<template lang="pug">
  .about
    .about__header
      .container.about__header-container
        h1.page-title.about__title Блок «Обо мне»
        .about__header-btn
          AddBtn(
            text="Добавить группу"
            size="small"
            type='button'
            @click="showAddSkillGroup = true")
    .about__content
      .container.about__content-container
        ul.skill-group__list
          li.skill-group__item(v-if="showAddSkillGroup")
            SkillGroup(:value="emptySkillGroup")
          li(
            v-for="skillGroup in skillGroups"
            :key="skillGroup.id"
          ).skill-group__item
            SkillGroup(
              :value="skillGroup"
            )
</template>
<script>
import AddBtn from "../AddBtn"
import SkillGroup from "./SkillGroup"
export default {
  components: {
    AddBtn,
    SkillGroup
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
      ],
      emptySkillGroup: {
        id: '',
        title: '',
        skills: []
      },
      showAddSkillGroup: false
    }
  }
  
}
</script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .about__header {
    margin-bottom: 60px;

    @include phonesLg {
      margin-bottom: 40px;
    }
  }

  .about__header-container {
    display: flex;

    @include phonesLg {
      flex-direction: column;
    }
  }

  .about__title {
    margin-right: 60px;
    margin-bottom: 0;

    @include phonesLg {
      margin-right: 0;
      margin-bottom: 30px;
    }
  }

  .about__header-btn {
    display: flex;
  }

  .about__content-container {
    @include phonesLg {
      width: 100%;
    }
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

    @include phonesLg {
      width: 100%;
      margin-bottom: 10px;
            
      &:last-child {
        margin-bottom: 25px;
      }
    }
  }
</style>