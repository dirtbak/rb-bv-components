<template>
    <div class="rb-multi-lang-input">
        <b-input-group size="sm" :class="cls">
            <b-form-input v-model="variants[selected]"
                          :required="selected==='ru'"
                          :disabled="disabled"></b-form-input>
            <template #append>
                <b-dropdown class="rb-dropdown"
                            variant="gray"
                            no-caret right
                            :disabled="disabled"
                            v-if="languages.length>1">
                    <template #button-content>
                        {{ alias[selected] }}
                        <rb-icon icon="icon-chevron-down"></rb-icon>
                    </template>
                    <b-dropdown-item v-for="lang of languages" :key="lang" :active="lang===selected"
                                     @click="selected=lang">
                        <template v-if="variants[lang]">
              <span class="rb-text-container d-flex justify-content-between align-items-center w-100">
                {{ variants[lang] }}
                <span class="rb-lang-text">{{ alias[lang] }}</span>
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
                    {{ alias[selected] }}
                </b-button>
            </template>
        </b-input-group>
    </div>
</template>

<script>
    export default {
        name: "RbMultiLangInput",
        props: {
            variants: {
                type: Object,
                default: function () {
                    return {
                        ru: '',
                        kz: '',
                        en: ''
                    }
                }
            },
            state: {type: Boolean, default: null},
            disabled: Boolean,
        },
        data() {
            return {
                placeholder: {
                    ru: 'Hа русском',
                    kz: 'Hа казахском',
                    en: 'Hа английском'
                },
                alias: {
                    ru: 'рус',
                    kz: 'қаз',
                    en: 'eng'
                },
                languages: ['ru', 'kz', 'en'],
                selected: 'ru',
            }
        },
        computed: {
            cls() {
                return {
                    'is-invalid': this.state === false,
                    'is-valid': this.state === true,
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
