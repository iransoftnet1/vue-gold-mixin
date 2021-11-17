
/**
 * Model Mixin
 * @type {{data(): *, watch: {selfValue(*=): void, value: {handler(*): void, deep: boolean, immediate: boolean}}, model: {prop: string, event: string}, props: {value: {default: string, type: [*, *, *, *, *]}}}}
 */
export const modelMixin = {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [String, Number, Array, Object, Boolean],
      default: ''
    }
  },
  data () {
    return {
      selfValue: ''
    }
  },
  watch: {
    value: {
      handler (val) {
        if (this.selfValue !== val) this.selfValue = val
      },
      immediate: true,
      deep: true
    },
    selfValue (val) {
      if (val !== this.value) this.$emit('input', val)
    }
  }
}

export const syncProps = {
  data () {
    return {
      ...this.handleSyncProps(),
      unWatcherSync: []
    }
  },
  methods: {
    _sync () {
      return []
    },
    handleSyncProps () {
      let propsData = {}
      this._sync().map((propName) => {
        // set data (data local prop)
        propsData['sync_' + propName] = this.propName

        this.$nextTick(() => {
          // change _prop (data local prop)
         let unWatchData = this.$watch('sync_' + propName, function (dataValue) {
            this.$emit('update:' + propName, !!dataValue)
          }, {
            deep: true,
            immediate: true
          })

          // change prop (main prop)
          let unWatchProp = this.$watch(propName, function (propValue) {
            this['sync_' + propName] = propValue
          }, {
            deep: true,
            immediate: true
          })
          this.unWatcherSync.push(unWatchData,unWatchProp)
        })
      })
      return propsData
    }
  },
  beforeDestroy () {
    this.unWatcherSync.map(unwatch => unwatch())
  }
}
