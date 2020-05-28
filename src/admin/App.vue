<template lang="pug">
  .root-container
    router-view(name="header")
    router-view(name="nav")
    main.content-container
      keep-alive
        router-view
    toast()
</template>
<script>
export default {
  components: {
    toast: () => import('./components/partial/Toast')
  }
}
</script>
<style lang="postcss">
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
  @import "../styles/layout/fonts.pcss";

  .divider {
    margin: 0;
    background-color: #1f232d;
    opacity: 0.15;
  }

  .admin-wrapper {
    display: flex;

    .maincontent {
      width: 100%;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
  }

  .container {
    max-width: 1080px;
    /* width: 90%; */
  }

  .root-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: $admin-font;
  }

  .page-title {
    font-size: 21px;
    font-weight: 700;
    margin-bottom: 60px;

    @include tablets {
      margin-bottom: 50px;
    }

    @include phonesLg {
      font-size: 18px;
      margin-bottom: 40px;
    }
  }

  .content-container {
    background: url("../images/bg/bg-admin.jpg") center center /cover no-repeat;
    flex: 1;
    padding-top: 60px;
  }

  .form__btn {
    color: $white;
    font-weight: 700;
    text-transform: uppercase;
    padding: 20px 40px;
    background-image: linear-gradient(to right, #006aed 0%, #3f35cb 100%);
    border-radius: 30px;

    @include phonesLg {
      font-size: 14px;
    }

    &--big {
      padding: 20px 35px;
      border-radius: 35px;
    }

    &--plain {
      text-transform: initial;
      background: transparent;
      color: #383bcf;
      margin-right: 10px;
      padding: 20px 30px;
    }
  }
    
  .card {
    box-shadow: 4px 3px 20px rgba(0, 0, 0, 0.07);
    background-color: $white;
    width: 100%;
  }

  .blocked {
    opacity: 0.5;
    filter: grayscale(100%);
    pointer-events: none;
    user-select: none;
  }
</style>