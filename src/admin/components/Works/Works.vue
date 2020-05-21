<template lang="pug">
  .works
    .works__header
      .container
        h1.page-title.works__title Блок «Работы»
    .works__content
      .container.works__container
        WorkEdit(
          v-if="showAddWork"
          :work="work"
          @hide="hideAddWork")
        
        ul.works__list
          li.works__item
            AddBtn(
              text="Добавить работу"
              size="plain"
              @click="showAddWork = true")
          li.works__item(
            v-for="work in works"
            :key="work.id"
          )
            work(
            :value="work"
            @edit="editWork")
</template>
<script>
import Work from './Work'
import AddBtn from '../AddBtn'
import WorkEdit from './WorkEdit'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    Work,
    AddBtn,
    WorkEdit
  },

  created() {
    this.loadWorks(this.user.id)
    // this.works = this.makeArrWithRequireImages(this.works)
  },

  data () {
    return {
      showAddWork: false,
      work: {
        title: '',
        link: '',
        description: '',
        techs: '',
        photo: null
      }
      // works: [
      //   {
      //     "id": 1,
      //     "title": "Сайт об экстримальном отдыхе",
      //     "skills": "Html, Css, JavaScript",
      //     "image": "1.jpg",
      //     "link": "//google.com",
      //     "desc": "Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 2 месяца только самых тяжелых испытаний и бессонных ночей!"
      //   },
      //   {
      //     "id": 2,
      //     "title": "Сайт небольшого города",
      //     "skills": "Pug, PostCss, VueJS",
      //     "image": "2.jpg",
      //     "link": "//yandex.ru",
      //     "desc": "Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности требует от нас анализа форм воздействия. "
      //   },
      //   {
      //     "id": 3,
      //     "title": "Сайт автомобильного журнала",
      //     "skills": "Laravel, Saas, React",
      //     "image": "3.jpg",
      //     "link": "//rambler.ru",
      //     "desc": "Дорогие друзья, повышение уровня гражданского сознания играет важную роль в формировании существующих финансовых и административных условий."
      //   }
      // ],
    }
  },

  computed: {
    ...mapState('works', ['works']),
    ...mapState('auth', ['user'])
  },

   methods: {
    ...mapActions('works', ['loadWorks']),

    hideAddWork() {
      this.showAddWork = false
      Object.assign(
        this.work,
        {
          title: '',
          link: '',
          description: '',
          techs: '',
          photo: null
        }
      )
    },

    editWork(){

    }
    // makeArrWithRequireImages(array) {
    //   return array.map((item) => {
    //     const requirePic = require(`../../../images/content/works/${item.image}`);
    //     item.image = requirePic;
    //     return item;
    //   });
    // }
  }
  
}
</script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .works__container {
    display: flex;
    flex-direction: column;

    @include phonesLg {
      width: 100%;
    }
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

    @include tablets {
      width: calc(100% / 2 - 30px);
    }

    @include phonesLg {
      width: 100%;
    }

    @include phones {
      margin-bottom: 10px;
      
      &:last-child {
        margin-bottom: 25px;
      }
    }
  }
</style>