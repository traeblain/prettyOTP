<template>
  <div style="height: 100%">
    <the-code 
      :secret="$current.secret" 
      :icon="$current.icon" 
      :account="$current.account"
      :shortname="$current.shortname"
      :color="$current.color"></the-code>
    <v-footer fixed style="height: 94px">
    <v-container grid-list-xs class="favorites-list" style="height: 94px">
      <v-layout row no-wrap>
        <grid-item v-for="item in favorites" :shortname="item.shortname" :icon="item.icon" :color="item.color" :account="item.account" :secret="item.secret" :key="item.secret"></grid-item>
      </v-layout>
      <v-btn
              absolute
              dark
              fab
              top
              right
              small
              color="pink"
              @click.native.stop="gridlist = !gridlist"
            >
              <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
    </v-container>
    </v-footer>
    <grid-list :dialog.sync="gridlist" :addnew.sync="addnew" :listdata="listdata"></grid-list>
    <add-new :dialog.sync="addnew" :listdata="listdata"></add-new>
  </div>
</template>

<script>
  import theCode from './Code'
  import gridItem from './GridItem'
  import gridList from './GridList'
  import addNew from './AddNew'

  export default {
    name: 'display',
    components: {
      theCode, gridItem, gridList, addNew
    },
    data () {
      return {
        gridlist: false,
        addnew: false,
        secret: this.$current.secret,
        icon: this.$current.icon,
        account: this.$current.account,
        color: this.$current.color,
        shortname: this.$current.shortname,
        listdata: []
      }
    },
    computed: {
      favorites () {
        return this.listdata.slice(0, 4)
      }
    },
    created () {
      let that = this
      fetch('/static/data.json')
        .then(function (response) {
          return response.json()
        }).then(function (json) {
          that.listdata = json
          // that.$current.secret = json[0].secret
          // that.$current.icon = json[0].icon
          // that.$current.color = json[0].color
          // that.$current.account = json[0].account
          // that.$current.shortname = json[0].shortname
        }).catch(function (err) {
          console.log('parsing failed', err)
        })
    }
  }
</script>

<style lang="scss">
  .footer > :last-child {
    margin-right: 0;
  }
  .footer > :first-child {
    margin-left: 0;
  }
  div.favorites-list {
    padding: 0;
  }
  .text-center {
    text-align: center;
  }
  .flex-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  a.grid-list {
    height: 90px;
    color: white;
  }
  .icon-small {
    font-size: 2.2rem;
    line-height: 4.4rem;
  }
</style>
