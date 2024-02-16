import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as labs from 'vuetify/labs/components'
import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
  components: {
    ...labs
  }
})
