<template>
    <span class="rb-icon icon"
          :class="cls"
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
            fontSize: String,
            variant: String,
        },
        computed: {
            cls() {
                let a = [this.icon];

                if(this.variant) {
                    a.push(`text-${this.variant}`)
                }

                return a;
            }
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
