<template>
    <div class="rb-empty-state">
        <div class="rb-inner">
            <rb-icon :icon="icon" class="rb-main-icon"
                     :style="{'color': iconColor === ''? '': iconColor}"
                     v-if="showIcon"></rb-icon>
            <b-img :src="image" v-if="image"/>
            <h6 class="rb-title">{{title}}</h6>
            <p class="rb-description">
                <slot>{{description}}</slot>
            </p>
            <b-button class="rb-button border-primary bg-transparent"
                      size="sm"
                      @click="emptyAction"
                      v-if="buttonText">
                {{buttonText}}
            </b-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RbEmptyState',
        props: {
            icon: {type: String, default: 'icon-none'},
            iconColor: {type: String, default: ''},
            showIcon: {type: Boolean, default: true},
            title: {type: String},
            description: {type: String},
            image: {type: String},
            buttonText: {type: String}
        },
        methods: {
            emptyAction(){
                this.$emit('emptyStateAction')
            }
        }
    }
</script>
