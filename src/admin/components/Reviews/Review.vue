<template lang="pug">
  .review.card
    .review__author
      .author
        .author__avatar
            img(:src="value.photo").author__avatar-img
        .author__data
          .author__name {{value.author}}
          .author__desc {{value.occ}}
      hr.divider
    .review__content
      .review__text
        p {{value.text}}
    .review__btns
      CardBtn(title="Править" icon="edit")
      CardBtn(title="Удалить" icon="delete")
</template>
<script>
import CardBtn from "../CardBtn"
export default {
  props: {
    value: Object
  },

  components: {
    CardBtn
  }
}
</script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .review {
    display: flex;
    flex-direction: column;
    padding: 20px;
    min-height: 380px;

    @include phones {
      padding: 30px 0;
    }
  }

  .author {
    padding: 10px 10px 0 10px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;

    @include phones {
      padding: 0 20px;
    }
  }

  .author__avatar {
    overflow: hidden;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 20px;
    flex-shrink: 0;
  }

  .author__name {
    font-size: 18px;
    font-weight: 700;

    @include phones {
      font-size: 16px;
      margin-bottom: 5px;
    }

  }

  .author__desc {
    font-weight: 600;
    opacity: .5;

    @include phones {
      font-size: 14px;
    }
  }

  .review__content {
    padding: 30px 10px 20px 10px;
    font-weight: 600;

    @include phones {
      padding: 30px 20px 20px 20px;
    }
  }

  .review__text {
    opacity: .7;
    line-height: 30px;
  }

  .review__btns {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin-top: auto;
    font-weight: 600;
    margin-bottom: 10px;

    @include phones {
      padding: 0 20px;
    }
  }
</style>