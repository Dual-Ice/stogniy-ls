<template lang="pug">
  .root-container
    header.header-container
      Header
    nav.nav-container
      Navigation
    main.content-container
      router-view

</template>
<script>
import Header from "./components/Header"
import Navigation from "./components/Navigation"
import About from "./components/About/About"
import Works from "./components/Works/Works"
import Reviews from "./components/Reviews/Reviews"

export default {
  components: {
    Header,
    Navigation,
    About,
    Works,
    Reviews
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

  .header-container {
    padding: 17px 0;
    background-image: linear-gradient(to right, #3e3e59 0%, #454573 100%);
  }

  .page-title {
    font-size: 21px;
    font-weight: 700;
    margin-bottom: 60px;
  }

  .nav-container {
    background: $white;
  }

  .content-container {
    background: url("../images/bg/bg-admin.jpg") center center /cover no-repeat;
    flex: 1;
    padding-top: 60px;
  }

  .add-new-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: $links-color;
    font-weight: 600;
    padding: 3px;
    border: none;
    font-size: 16px;

    &:before {
      content: "";
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: svg-load('cross.svg', fill=$white, width=15px, height=15px, transform='rotate(45deg)') center center no-repeat, linear-gradient(to right, #006aed, #3f35cb);
      color: $white;
      flex-shrink: 0;
      flex-basis: 40px;
      font-size: 30px;
      line-height: 40px;
    } 

    &--small {
      &:before {
        content: "";
        background: svg-load('cross.svg', fill=$white, width=8px, height=8px, transform='rotate(45deg)') center center no-repeat, linear-gradient(to right, #006aed, #3f35cb);
        width: 20px;
        height: 20px;
        flex-basis: 20px;
        font-size: 18px;
        margin-right: 13px;
        line-height: 1;
      }
    }
  }

  .add-new-btn-plain {
    display: flex;
    flex: 1;
    justify-content: center;
    align-content: center;
    padding: 0;
    border: none;
    background-image: linear-gradient(to right, #006aed 0%, #3f35cb 100%);
  }

  .btn-text {
    color: $white;
    font-size: 18px;
    font-weight: 700;
    line-height: 25px;

    &:before {
      display: flex;
      content: '+';
      font-weight: 300;
      font-size: 72px;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 2px solid currentColor;
      margin-bottom: 30px;
    }
  }

  .form__btn {
    color: $white;
    font-weight: 700;
    text-transform: uppercase;
    padding: 20px 40px;
    background-image: linear-gradient(to right, #006aed 0%, #3f35cb 100%);
    border-radius: 30px;

    &--big {
      padding: 25px 45px;
      border-radius: 35px;
    }

    &--plain {
      background: transparent;
      color: #383bcf;
      margin-right: 10px;
    }
  }
    
  .card {
    box-shadow: 4px 3px 20px rgba(0, 0, 0, 0.07);
    background-color: $white;
  }
</style>