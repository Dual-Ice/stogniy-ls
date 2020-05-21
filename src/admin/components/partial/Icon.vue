<template lang="pug">
  svg(
    :class="className"
    :viewBox="viewBox"
    preserveAspectRatio="none"
  )
    use(:xlink:href="src")
</template>
<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      icon: null,
    }
  },

  computed: {
    src() {
      return this.icon.url
    },
    viewBox() {
      return this.icon.viewBox
    },
  },

  created() {
    this.icon = require(`../../../images/icons/${this.iconName}.svg`).default
  }
};
</script>