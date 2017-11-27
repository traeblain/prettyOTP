<template>
  <v-flex xs3>
    <v-card flat tile :class="color">
      <v-layout column align-center class="text-center grid-list">
        <a class="grid-list" @click="updateCurrent()" v-ripple>
          <i class="fa icon-small" :class="'fa-' + icon"></i>
          <div>
            {{ shortname }}
          </div>
        </a>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'griditem',
  props: ['icon', 'color', 'shortname', 'account', 'secret'],
  data () {
    return {
      a: 0
    }
  },
  methods: {
    updateCurrent () {
      this.$current.icon = this.icon
      this.$current.color = this.color
      this.$current.shortname = this.shortname
      this.$current.account = this.account
      this.$current.secret = this.secret
    }
  }
}
</script>

<style lang="scss" scoped>
  .grid-list{
    color: white;
    width: 100%;
    display: block;
  }
</style>

