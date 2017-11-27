<template>
  <v-content :class="color" class="full-height">
    <v-snackbar
      :timeout="2000"
      top
      v-model="copied"
    >
      Copied!
    </v-snackbar>
    <v-progress-linear v-model="timeout" height="15" style="margin-top: 0;" :color="progressColor"></v-progress-linear>
    <v-container fluid class="item-display">
      <v-slide-y-transition mode="out-in">
        <v-layout column align-center>
          <i class="fa icon-size" :class="'fa-' + icon"></i>
          <div class="code-display" id="thecode">
            <span v-text="code.substr(0, 3)"></span><span v-text="code.substr(-3)"></span>
          </div>
          <div class="account-display" v-text="account"></div>
          <v-btn bottom floating absolute right fab outline color="white" id="thebutton" data-clipboard-target="#thecode">
            <v-icon>content_copy</v-icon>
          </v-btn>
        </v-layout>
      </v-slide-y-transition>
    </v-container>
  </v-content>
</template>

<script>
  import Clipboard from 'clipboard'
  import otplib from 'otplib'

  export default {
    name: 'code',
    props: ['secret', 'icon', 'account', 'color', 'shortname'],
    data () {
      return {
        // secret: 'KEYWOMLZMMVWIULRLBTGOTDUPJYFGRCY',
        // icon: 'empire',
        // account: 'trae@traeblain.com',
        // color: 'indigo',
        // shortname: 'The Empire',
        code: '000000',
        timeout: 0,
        clip: null,
        copied: false,
        timer: null
      }
    },
    computed: {
      progressColor () {
        if (this.color === 'black') {
          return 'grey darken-1'
        }
        if (this.color.indexOf('darken') > 0) {
          // let newColor = this.color.split(/(\s+)/)[0]
          // return newColor + ' lighten-1'
          return 'white'
        }
        return this.color + ' darken-4'
      }
    },
    methods: {
      generator () {
        const epoch = Math.floor(new Date().getTime() / 1000)
        this.timeout = (1 - ((epoch % 30) / 30)) * 100
        this.code = otplib.authenticator.generate(this.secret)
      }
    },
    created () {
      this.timer = setInterval(this.generator, 1000)
      /* eslint-disable no-new */
      let that = this
      that.clip = new Clipboard('#thebutton')
      that.clip.on('success', function (e) {
        that.copied = true
        e.clearSelection()
      })
    },
    destroyed () {
      this.clip.destroy()
      clearInterval(this.timer)
    }
  }
</script>

<style lang="scss" scoped>
  $display-font-size: 4rem;

  .icon-size {
    font-size: $display-font-size * 1.75;
  }
  .code-display {
    font-size: $display-font-size;
    line-height: $display-font-size * 1.75;
    // font-family: Courier New, Courier, monospace;
    font-weight: lighter;
    letter-spacing: $display-font-size / 6;
    span:first-child {
      margin-right: $display-font-size / 2;
    }
  }
  .item-display {
    position: relative;
  }
  .account-display {
    font-size: $display-font-size / 3;
    margin-bottom: 30px;
  }
  .item-display {
    color: white;
  }
  #thebutton {
    margin-bottom: 40px;
  }
  .full-height{
    height: 100%;
  }
</style>

