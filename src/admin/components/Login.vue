<template lang="pug">
  .login
    .login__content
      form(
        @submit.prevent="login"
      ).login__form
        .login__form-title Авторизация
        .login__row
          CustomInput(
            name="login"
            title="Логин"
            icon="user-empty"
            v-model="user.name"
            :errorText="validationMessage('name')"
          )
        .login__row
          CustomInput(
            name="password"
            title="Пароль"
            icon="key"
            type="password"
            v-model="user.password"
            :errorText="validationMessage('password')"
          )
        .login__btns
          button(
            :class="{ 'blocked': isBlocked }"
            type="submit"
          ).login__btn Отправить
</template>
<script>
import Icon from './partial/Icon'
import axios from '../customAxios'
import { mapMutations } from 'vuex'
import CustomInput from './partial/CustomInput'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  components: {
    Icon,
    CustomInput
  },

  data () {
    return {
      user: {
        name: '',
        password: ''
      }
    }
  },

  validations: {
    user:{
      name: {
        required,
        minLength: minLength(4)
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },

  computed: {
    isBlocked () {
      return Boolean (!this.user.name || !this.user.password)
    }
  },

  methods: {
    ...mapMutations('toast', ['showToast']),

    async login() {
      this.$v.$touch()
      if (!this.$v.$error) {
        try {
          const response = await axios.post('/login', this.user)
          const token = response.data.token
          localStorage.setItem('user-token', token)
          this.$router.replace('/')
        } catch (error) {
          const message = error.response.data.error || error.response.data.message
          this.showToast( { type: 'error', message });
        }
      }
    },

    validationMessage (field) {
      const obj = this.$v.user[field]

      if (!this.$v.$error) return ''

      if (!obj.required) {
        return "Поле обязательно" 
      }
      if (!obj.minLength) {
        return `Введите не меньше ${obj.$params.minLength.min} символов`
      }
    }
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

  .login__btns {
    display: flex;
    width: 100%;
    padding: 0 8%;
    justify-content: center;

    @include phones {
      padding: 0;
    }
  }

  .login__btn {
    width: 100%;
    padding: 30px;
    background-image: linear-gradient(to right, #ad00ed, #5500f2);
    border-radius: 40px 5px;
    color: $white;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 18px;
  }
</style>