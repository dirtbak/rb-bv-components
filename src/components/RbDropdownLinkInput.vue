<template>
    <b-dropdown variant="plain" class="rb-dropdown rb-dropdown-link-input" :class="{'is-invalid': state === false}">
        <template v-slot:button-content>
            <slot name="button-content" :text="text" :cancelItemText="cancelItemText" :placeholder="placeholder"
                  :showCancelItem="showCancelItem">
                <a class="rb-text">{{text? text: (showCancelItem? cancelItemText: placeholder)}}</a>
            </slot>
        </template>
        <b-dropdown-item v-for="o in options" :key="o.value" @click="onClick(o)">
            <slot name="option-content" :option="o">
                {{o.text}}
            </slot>
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
    import RbDropdownInput from "@/components/RbDropdownInput";

    export default {
        name: 'RbDropdownLinkInput',
        extends: RbDropdownInput,
    };
</script>
