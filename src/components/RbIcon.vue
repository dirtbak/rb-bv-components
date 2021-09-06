<template>
    <span class="rb-icon icon" :class="icon"
          :style="getStyle()"
          @click="$emit('click', $event)"
          @mouseover="mouseover"
          @mouseout="mouseout"/>
</template>

<script>
    export default {
        name: 'RbIcon',
        props: {
            icon: String,
            color: String,
            fontSize: String
        },
        methods: {
            getStyle() {
                const style = {};

                if (this.color) style.color = this.color;
                if (this.fontSize) style.fontSize = this.fontSize

                return style;
            },
            mouseover() {
                this.$emit('mouseover')
            },
            mouseout() {
                this.$emit('mouseout')
            }
        }
    }
</script>
