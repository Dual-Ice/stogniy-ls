<template lang="pug">
  .work.card
    .work__preview
      .work__image-wrap
        img(:src="workImage").work__image
      .work__tags
        ul.work__tags-list
          li.work__tag(
            v-for="tag in tags"
            :key="tag"
          )
            .tag {{tag}}
    .work__info
      .work__title {{work.title}}
      .work__decs
        p {{work.description}}
      a(:href="work.link").work__link {{work.link}}
    .work__btns
      CardBtn(
        title="Править"
        icon="edit"
        @click="editWork"
      )
      CardBtn(
        title="Удалить"
        icon="delete"
        @click="deleteWork(work.id)"
      )
</template>
<script>
import { mapActions } from 'vuex'
import CardBtn from '../partial/CardBtn'
export default {
  props: {
    work: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  components: {
    CardBtn
  },

  computed: {
    tags () {
      if (!this.work) return []
      return this.work.techs.split(",").map(tag =>tag.trim())
    },

    workImage () {
      if (this.work) {
        return  `https://webdev-api.loftschool.com/${this.work.photo}`
      }

      return null
    }
  },

  methods: {
    ...mapActions('works', ['deleteWork']),

    editWork () {
      this.$emit('edit', this.work)
    }
  }
}
</script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .work {
    display: flex;
    flex-direction: column;
  }

  .work__preview {
    position: relative;
  }

  .work__image-wrap {
    height: 190px;
  }

  .work__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center
  }

  .work__tags {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .work__tags-list {
    display: flex;
    flex-wrap: wrap;
  }

  .work__tag {
    font-size: 13px;
    color: #283340;
    margin-left: 8px;
    font-weight: 600;
    margin-top: 5px;
  }

  .tag {
    padding: 8px 18px;
    border-radius: 25px;
    background-color: $white;
  }

  .work__info {
    padding: 40px 30px 0 30px;
    margin-bottom: 20px;
    font-weight: 600;

    @include phonesLg {
      padding: 30px 20px 0 20px;
    }
  }

  .work__title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 25px;
  }

  .work__decs {
    opacity: .7;
    line-height: 30px;
    margin-bottom: 30px;
  }

  .work__link {
    color: #383bcf;
  }

  .work__btns {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    margin-top: auto;
    font-weight: 600;
    margin-bottom: 40px;

    @include phonesLg {
      padding: 0 20px;
      margin-bottom: 30px;
    }
  }
</style>