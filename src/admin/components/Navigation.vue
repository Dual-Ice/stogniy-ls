<template lang="pug">
  nav.nav-container
    .container
      ul.nav__list
        li.nav__item(
          v-for="(tab, ndx) in tabs"
        ) 
          router-link(
            :to="tab.href"
            exact-active-class="active"
          ).nav__link {{tab.title}}
</template>
<script>
export default {
  data () {
    return {
      tabs: [
        {
          title: 'Обо мне',
          href: '/'
        },
        {
          title: 'Работы',
          href: '/works'
        },
        {
          title: 'Отзывы',
          href: '/reviews'
        }
      ]
    }
  }
}
</script>
<style lang="postcss" scooped>
  @import url("../../styles/mixins.pcss");

  .nav-container {
    background: $white;
  }
  
  .nav__list {
    display: flex;
    align-items: center;
    height: 77px;

    @include phones {
      justify-content: center;
    }
  }

  .nav__item {
    height: 100%;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    @include phones {
      flex: 1;
    }
  }

  .nav__link {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    height: 100%;
    border-bottom: 3px solid transparent;
    padding: 0 30px;
    transition: all .3s ease-in;

    &:hover,
    &.active {
      color: #383bcf;
      border-color: currentColor;
      font-weight: 600;
    }

    @include phones {
      padding: 0;
    }
  }

</style>