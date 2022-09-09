<template>
    <div
        v-click-outside="clickOutSide"
        @click="inputFocused"
        :class="[cls, 'rb-email-input']">
        <p v-show="!isFocus"
           class="element-list">
            <b-badge v-if="!selectedItems.length" class="item empty" variant="light">
                <span class="title">{{ placeholder }}</span>
            </b-badge>
            <b-badge v-for="(item, index) in selectedItems" class="item" variant="light">
                <span v-b-tooltip.hover="{title: item, duration: 400}"
                      class="title">{{ item }}
                </span>
                <rb-icon icon="icon-close" v-show="!disabled" @click="remove(index, $event)"/>
            </b-badge>
        </p>
        <b-input v-show="isFocus"
                 ref="inputEmail"
                 type="email"
                 v-model="email"
                 :placeholder="placeholder"
                 autocomplete="off"
                 v-on:keyup.enter="onKeyEnter"
                 v-on:keyup.space="onKeyEnter"
                 v-on:keyup.esc="onKeyEsc"
                 @input="onInput"
        />
        <b-dropdown
            v-if="selectedItems && selectedItems.length"
            no-caret
            right
            class="rb-counter-dropdown"
            variant="plain"
        >
            <template v-slot:button-content>
                <span class="rb-counter">
                    {{ selectedItems.length }}
                </span>
            </template>
            <b-dropdown-item v-for="(item, index) in selectedItems">
                <rb-text>{{ item }}</rb-text>
                <b-button v-if="!disabled" variant="plain" @click="remove(index, $event)">
                    <rb-icon class="icon-close"></rb-icon>
                </b-button>
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
export default {
    name: 'RbEmailInput',
    props: {
        value: {type: Array, default: () => []},
        placeholder: {type: String, default: 'Начните набирать...'},
        state: {type: Boolean, default: null},
        multiple: {type: Boolean, default: false},
        max: {type: [String, Number], default: Infinity},
        min: {type: [String, Number], default: Infinity},
        disabled: Boolean,
        focused: {type: Boolean, default: false},
    },
    data() {
        return {
            selectedItems: [],
            email: '',
            isFocus: false
        };
    },
    watch: {
        value() {
            this.selectedItems = this.value || []
        },
        focused() {
            this.isFocus = this.focused
        },
        selectedItems() {
            this.selectedItems = this.selectedItems === null ? [] : this.selectedItems
            this.$emit('input', this.selectedItems)
        }
    },
    computed: {
        valid() {
            return this.selectedItems && !this.selectedItems.length
        },
        cls() {
            return {
                'empty': this.valid,
                'is-invalid': this.state === false,
                'is-valid': this.state === true,
            }
        },
    },
    methods: {
        onKeyEnter() {
            const email = this.email.toLowerCase()
            if (email && this.validateEmail(email) && !this.selectedItems.find(item => item === email)) {
                this.selectedItems.push(email)
            }
            this.email = '';
        },
        validateEmail(email) {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(email);
        },
        onInput() {
            this.email = this.email.replace(/\s/g, '').toLowerCase()
        },
        remove(index, event) {
            event.stopPropagation()
            event.preventDefault()
            this.selectedItems.splice(index, 1)
        },
        inputFocused() {
            if (!this.disabled) {
                this.isFocus = true
                setTimeout(() => {
                    this.$refs.inputEmail.focus()
                }, 100)
            }
        },
        clickOutSide() {
            this.isFocus = false
            this.email = ''
        },
        onKeyEsc() {
            this.clickOutSide()
        },
    },
    created() {
        this.selectedItems = this.value || []
    }
};
</script>
