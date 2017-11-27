<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-stepper v-model="newCodeStep">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="newCodeStep > 1">Get Secret</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="newCodeStep > 2">Customize</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">Done</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card>
              <v-card-title>
                Scan/Add Code
              </v-card-title>
              <v-card-text>
                <qrcode-reader @decode="onDecode" :paused="pause" v-show="!manual">
                  Scan your Code or Type the Secret Below
                  <v-divider></v-divider>
                </qrcode-reader>
                <v-container align-center>
                  <a @click="manual=!manual">
                    <span v-if="!manual">Type in Code Manually</span>
                    <span v-else>Scan QR Code</span>
                  </a>
                </v-container>
                <div v-show="manual">
                  <v-text-field
                      name="secret"
                      label="OTP Secret"
                      v-model="details.secret"
                    ></v-text-field>
                </div>
              </v-card-text>
              <v-btn color="primary" @click.native="newCodeStep = 2" :disabled="!details.secret">Continue</v-btn>
              <v-btn flat @click.stop="closeDialog">Cancel</v-btn>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card>
              <v-card-title>
                Customize
              </v-card-title>
              <v-card-text>
                <v-text-field
                  name="name"
                  label="Name"
                  v-model="details.shortname"
                ></v-text-field>
                <v-text-field
                  name="account"
                  label="Account"
                  v-model="details.account"
                ></v-text-field>
                <!-- need to change to Vue-Multiselect -->
                <v-text-field
                  name="icon"
                  label="Icon (ref Font-Awesome names)"
                  v-model="details.icon"
                ></v-text-field>
                <!-- need to change to a color picker...I gots idea... -->
                <v-text-field
                  name="color"
                  label="Color"
                  v-model="details.color"
                ></v-text-field>
              </v-card-text>
              <v-btn color="primary" @click.native="newCodeStep = 3">Continue</v-btn>
              <v-btn flat @click.stop="closeDialog">Cancel</v-btn>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="3">
            
            <v-btn color="primary" @click.native="updateList">Continue</v-btn>
            <v-btn flat @click.stop="closeDialog">Cancel</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>  
</template>

<script>
import { QrcodeReader } from 'vue-qrcode-reader'

export default {
  name: 'AddNew',
  props: ['dialog', 'listdata'],
  components: {
    'qrcode-reader': QrcodeReader
  },
  data () {
    return {
      manual: false,
      pause: false,
      newCodeStep: 1,
      details: {
        secret: '',
        icon: '',
        account: '',
        color: '',
        shortname: ''
      }
    }
  },
  methods: {
    closeDialog () {
      this.newCodeStep = 1
      this.details = {
        secret: '',
        icon: '',
        account: '',
        color: '',
        shortname: ''
      }
      this.$emit('update:dialog', !this.dialog)
    },
    onDecode (content) {
      console.log(content)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
