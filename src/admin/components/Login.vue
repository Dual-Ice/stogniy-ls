<template lang="pug">
  .login
    .login__content
      button(type="button").login__close
        Icon(
          iconName="cross"
          className="login__close-icon"
        )
      form.login__form
        .login__form-title Авторизация
        .login__row
          CustomInput(
            title="Логин"
            icon="user-empty"
          )
        .login__row
          CustomInput(
            title="Пароль"
            icon="key"
            type="password"
          )
        .login__btn
          button(
            type="submit"
          ).login__send-data Отправить
</template>
<script>
import Icon from "./Icon"
import CustomInput from "./CustomInput"
export default {
  components: {
    Icon,
    CustomInput
  }
}
</script>
<style lang="postcss" scoped>
  @import "../../styles/mixins.pcss";

  .login {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("../../images/bg/bg-admin.jpg") center center /cover no-repeat;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0.5;
      background: #2d3c4e;
    }
  }

  .login__form {
    width: 563px;
    padding: 50px 77px 60px;
    background: $white;

    
    @include phones {
      width: 100%;
      padding-right: 7%;
      padding-left: 7%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .login__form-title {
    font-size: 36px;
    text-align: center;
    font-weight: 600;
    margin-bottom: 30px;
  }

  .login__content {
    position: relative;

    @include phones {
      height: 100%;
      width: 100%;
    }
  }

  .login__row {
    margin-bottom: 35px;
  }

  .login__btn {
    display: flex;
    width: 100%;
    padding: 0 8%;
    justify-content: center;

    @include phones {
      padding: 0;
    }
  }

  .login__send-data {
    width: 100%;
    padding: 30px;
    background-image: linear-gradient(to right, #ad00ed, #5500f2);
    border-radius: 40px 5px;
    color: $white;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 18px;
  }

  .login__close {
    position: absolute;
    right: 30px;
    top: 30px;
    background: transparent;
    padding: 0;
    border: none;
    display: flex;

    @include phonesLg {
      margin-right: 10px;
    }

    @include phones {
      right: 30px;
      margin-right: 0;
    }
  }

  .login__close-icon {
    width: 20px;
    height: 20px;
    fill: $font;
  }
</style>