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
            @click="showAddGroup = true")
    .about__content
      .container.about__content-container
        ul.skill-group__list
          li.skill-group__item(v-if="showAddGroup")
            SkillGroup(
              :skillGroup="category"
              @hide="hideAddGroup")
          li(
            v-for="category in categories"
            :key="category.id"
          ).skill-group__item
            SkillGroup(
              :skillGroup="category"
            )
</template>
<script>
import SkillGroup from './SkillGroup'
import AddBtn from '../partial/AddBtn'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    AddBtn,
    SkillGroup
  },

  data () {
    return {
      category: {
        category: ''
      },
      showAddGroup: false
    }
  },

  computed: {
    ...mapState('categories', ['categories']),
    ...mapState('auth', ['user'])
  },
  
  beforeRouteLeave (to, from, next) {
    this.showAddGroup = false
    next()
  },

  created() {
    this.loadCategories(this.user.id)
  },

  methods: {
    ...mapActions('categories', ['loadCategories']),
    
    hideAddGroup () {
      this.showAddGroup = false
      this.category = {
        category: ''
      }
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