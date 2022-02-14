<template>
    <b-input-group :class="cls" class="rb-multi-lang-input" v-click-outside="resetDropdown">
        <b-form-input v-model="value[compileLang(fieldName, suffix, selected)]"
                      :required="selected==='ru'"
                      :disabled="disabled"
                      :formatter="formatter"
                      @focus="resetDropdown"/>
        <template #append>
            <b-button variant="light" @click="toggleDropdown" tabindex="-1" :disabled="disabled">
                {{ alias[selected] }}
                <rb-icon :icon="show?'icon-chevron-up':'icon-chevron-down'"></rb-icon>
            </b-button>
            <b-dropdown class="rb-dropdown"
                        ref="dropdown"
                        variant="gray"
                        no-caret right
                        :disabled="disabled"
                        v-if="languages.length>1">
                <b-dropdown-item v-for="lang of languages" :key="lang" :active="lang===selected"
                                 @click="selectLang(lang)">
                    <template v-if="value[compileLang(fieldName, suffix, lang)]">
                          <span class="rb-text-container d-flex justify-content-between align-items-center w-100">
                              <span class="rb-lang-text">{{ value[compileLang(fieldName, suffix, lang)] }}</span>
                              <span class="rb-lang-type">{{ alias[lang] }}</span>
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
</template>

<script>
    export default {
        name: "RbMultiLangInput",
        props: {
            fieldName: {
                type: String,
                default: 'label'
            },
            suffix: {
                type: String,
                default: ''
            },
            value: {
                type: Object
            },
            state: {type: Boolean, default: null},
            disabled: Boolean,
            maxLength: [String,Number]
        },
        data() {
            return {
                show: false,
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
        methods: {
            selectLang(lang) {
                this.show = false
                this.selected = lang
                this.$emit('curLang', this.selected)
            },
            toggleDropdown(e) {
                e.preventDefault()
                this.show = !this.show

                if (!!this.show) this.$refs.dropdown.show()
                else this.$refs.dropdown.hide()
            },
            compileLang(field, suf, lang) {
                if (suf) {
                    return field + suf + lang
                } else {
                    return field + lang[0].toUpperCase() + lang.slice(1);
                }
            },
            resetDropdown() {
                this.show = false
            },
            formatter(val){
                return val.slice(0, this.maxLength)
            }
        }
    }
</script>
