<template lang="pug">
  .work.card
    .work__preview
      .work__image-wrap
        img(:src="value.image").work__image
      .work__tags
        ul.work__tags-list
          li.work__tag(
            v-for="tag in tags"
            :key="tag"
          )
            .tag {{tag}}
    .work__info
      .work__title {{value.title}}
      .work__decs
        p {{value.desc}}
      a(:href="value.link").work__link http:{{value.link}}
    .work__btns
      CardBtn(title="Править" icon="edit")
      CardBtn(title="Удалить" icon="remove")
</template>
<script>
import CardBtn from "../CardBtn"
export default {
  props: {
    value: Object
  },

  components: {
    CardBtn
  },

  computed: {
    tags () {
      if (!this.value) return []
      return this.value.skills.split(", ");
    }
  }
}
</script>
<style lang="postcss" scoped>
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
  }

  .work__tags {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .work__tags-list {
    display: flex;
  }

  .work__tag {
    font-size: 13px;
    color: #283340;
    margin-left: 8px;
    font-weight: 600;
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
  }
</style>