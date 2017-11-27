<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
    <v-card>
      <v-toolbar fixed dark color="primary">
        <v-btn icon @click.native="closeDialog" dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Codes</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click.native="addNew">
            <v-icon>add</v-icon> Add Code
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-toolbar light color="white"></v-toolbar>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <grid-item v-for="item in listdata" :shortname="item.shortname" :icon="item.icon" :color="item.color" :account="item.account" :secret="item.secret" :key="item.secret" @click.native="closeDialog"></grid-item>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import gridItem from './GridItem'

export default {
  name: 'gridlist',
  props: ['listdata', 'dialog', 'addnew'],
  components: {
    gridItem
  },
  data () {
    return {
      a: 0
    }
  },
  methods: {
    closeDialog () {
      this.$emit('update:dialog', !this.dialog)
    },
    selectCode (item) {
      console.log(item)
    },
    addNew () {
      this.$emit('update:addnew', !this.addnew)
    }
  }
}
</script>

<style lang="scss" scoped>
  .xs3 {
    margin-bottom: 2px;
  }
</style>

