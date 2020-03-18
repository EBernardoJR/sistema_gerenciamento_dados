import Vue from 'vue'
import mq from 'vue-mq'

//responsividade

Vue.use(mq, {
    breakpoints: {
        xs: 576,
        sm: 768,
        md: 960,
        lg: 1140,
        xl: Infinity
    }
})