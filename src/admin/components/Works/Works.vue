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
            v-for="work in modifiedWorks"
            :key="work.id"
          )
            work(
              :work="work"
              @edit="editWork"
            )
</template>
<script>
import Work from './Work'
import WorkEdit from './WorkEdit'
import AddBtn from '../partial/AddBtn'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  components: {
    Work,
    AddBtn,
    WorkEdit
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
    }
  },

  computed: {
    ...mapGetters('works', ['modifiedWorks']),
    ...mapState('auth', ['user'])
  },

  beforeRouteLeave (to, from, next) {
    this.showAddWork = false
    next()
  },

  created() {
    this.loadWorks(this.user.id)
  },

  methods: {
    ...mapActions('works', ['loadWorks']),

    hideAddWork () {
      this.showAddWork = false
      this.work = {
        title: '',
        link: '',
        description: '',
        techs: '',
        photo: null
      }
    },

    editWork (work) {
      Object.assign(this.work, work)
      this.showAddWork = true
    }
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