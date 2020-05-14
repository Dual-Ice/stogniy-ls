<template lang="pug">
  .works
    .works__header
      .container
        h1.page-title.works__title Блок «Работы»
    .works__content
      .container.works__container
        WorkAddEdit()

        ul.works__list
          li.works__item
            button.add-new-btn-plain
              .btn-text Добавить<br/>работу
          li.works__item(
            v-for="work in works"
            :key="work.id"
          )
            work(
            :value="work")
</template>
<script>
import Work from "./Work"
import WorkAddEdit from "./WorkAddEdit"
export default {
  components: {
    Work,
    WorkAddEdit
  },

  created() {
    this.works = this.makeArrWithRequireImages(this.works)
  },

  data () {
    return {
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
        }
      ]
    }
  },

   methods: {
    makeArrWithRequireImages(array) {
      return array.map((item) => {
        const requirePic = require(`../../../images/content/works/${item.image}`);
        item.image = requirePic;
        return item;
      });
    }
  }
  
}
</script>
<style lang="postcss" scoped>
  .works__container {
    display: flex;
    flex-direction: column;
  }

  .works__list {
    display: flex;
    margin-left: -30px;
    flex-wrap: wrap;
  }

  .works__item {
    width: calc(100% / 3 - 30px);
    margin-left: 30px;
    margin-bottom: 30px;
    display: flex;
  }
</style>