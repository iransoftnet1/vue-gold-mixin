# vue-gold-mixin

- v-model
- sync props

# v-model 
Whenever you need to have a component directiv vmodel, just add this mixin to it. You can easily separate the components

You can access it with the selfValue key.

haw to use :

your component
```
<template>
  <div>
      <v-text-field
        v-model="selfValue"
      />
  </div>
</template>

<script>
import { modelMixin } from '@/modules/mixins'
export default {
  name: 'CInput',
  mixins: [modelMixin]
}
</script>
```

use component

```
<template>
  <div>
    <label>username :</label>
      <c-input v-model="username"/>
  </div>
</template>

<script>
export default {
  data(){
    return {
      username : ''
    }
  }
}
</script>
```
# sync props
If you want to use the prop sync feature (almost similar to vmodel) it has its own problems and your code gets a little dirty

Here it is enough for you to use this mixin and give it a list of your props names with the _sync method.

You now have access to it with sync_nameYourProp, and any changes you make to it apply to your parent.

The example below is a combination of the example above .

your component :
```
<template>
  <div>
      <v-text-field
        v-model="selfValue"
      />
    <label>
      {{selfValue}}
    </label>
  </div>
</template>

<script>
import { modelMixin,syncProps } from '@/modules/mixins'
export default {
  name: 'CInput',
  mixins: [modelMixin,syncProps],
  props:{
    passwordShow : {
      type: Boolean,
      default : false
    }
  },
  method:{
    _sync(){
      return ['passwordShow']
    }
  }
}
</script>
```
use component :
```
<template>
  <div>
    <label>password :</label>
    <c-input v-model="password" :password-show.sync="passShow"/>
    <c-input v-model="verifyPassword" :password-show.sync="passShow"/>
    <button
    @click="passShow = !passShow"
    >
      show
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      verifyPassword: '',
      passShow: false
    }
  }
}
</script>


```
