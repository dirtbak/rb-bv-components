<template>
  <div class="rb-multi-lang-input">
    <b-input-group size="sm" :class="state?'is-valid':'is-invalid'">
      <b-form-input v-model="variants[selected]" :required="selected==='рус'"></b-form-input>
      <template #append>
        <b-dropdown variant="gray" no-caret right class="rb-dropdown" v-if="languages.length>1">
          <template #button-content>
            {{ selected }}
            <!--this icon needs to be replaced with chevron-->
            <rb-icon icon="icon-arrow-carret-down"></rb-icon>
          </template>
          <b-dropdown-item v-for="lang of languages" :key="lang" :active="lang===selected" @click="selected=lang">
            <template v-if="variants[lang]">
              <span class="rb-text-container d-flex justify-content-between align-items-center w-100">
                {{ variants[lang] }}
                <span class="rb-lang-text">{{ lang }}</span>
              </span>
            </template>
            <template v-else>
              <span class="rb-text-container d-flex justify-content-between align-items-center w-100">
                <span class="rb-text-primary">
                  {{ placeholder[lang] }}
                </span>
                <span class="rb-text-secondary">Добавьте если нужно</span>
              </span>
            </template>
          </b-dropdown-item>
        </b-dropdown>
        <b-button variant="light" disabled v-else>
          {{ selected }}
        </b-button>
      </template>
    </b-input-group>
  </div>
</template>

<script>
export default {
  name: "RbMultiLangInput",
  props: {
    state: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      placeholder: {
        'рус': 'Hа русском',
        'қаз': 'Hа казахском',
        'eng': 'Hа английском'
      },
      //global language config here
      languages: ['рус', 'қаз', 'eng'],
      selected: 'рус',
      variants: {
        'рус': '',
        'қаз': '',
        'eng': ''
      }
    }
  },
  watch: {
    variants: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true
    }
  }
}
</script>