<template lang="pug">
  .header
    .container.header__container
      .header__info
        .user
          .user__avatar
              img(src="../../images/userfiles/admin.jpg").user__avatar-img
          .user__name
            span Максим Стогний
            a.exit-btn(href="#") Выйти
      .header__title Панель Администрирования
      .header__btn
        a.exit-btn(href="#") Выйти
</template>
<script>
export default {
  
}
</script>
<style lang="postcss" scooped>
  @import url("../../styles/mixins.pcss");

  .header {
    color: $white;
  }

  .header__container {
    display: flex;
    align-items: center;
  }

  .header__btn {
    margin-left: auto;
  }

  .header__title {
    opacity: .5;
    font-size: 14px;

    @include phones {
      display: none;
    }
  }

  .user {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .user__avatar {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    display: block;
    overflow: hidden;
    flex-shrink: 0;
    margin-right: 20px;
  }

  .user__avatar-img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .user__name {
    font-size: 18px;
    font-weight: 600;

    @include phones {
      font-size: 16px;
    }

    .exit-btn {
      display: none;
      font-size: 14px;
      @include phones {
        display: block;
      }
    }
  }

  .exit-btn {
    opacity: .7;
    text-decoration: underline;
    font-size: 16px;
    font-weight: 400;

    @include phones {
      display: none;
    }
  }
</style>