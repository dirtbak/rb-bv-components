<template>
    <div class="rb-empty-state">
        <div class="rb-inner">
            <rb-icon icon="icon" :style="{'color': iconColor === ''? '': iconColor}" v-if="showIcon"></rb-icon>
            <p class="rb-title">{{title}}</p>
            <p class="rb-description">
                <slot>{{description}}</slot>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RbEmptyState',
        props: {
            icon: {type: String},
            iconColor: {type: String, default: ''},
            showIcon: {type: Boolean, default: true},
            title: {type: String},
            description: {type: String}
        }
    }
</script>
