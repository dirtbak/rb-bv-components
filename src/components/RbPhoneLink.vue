<template>
    <a class="rb-phone-link" :href="'tel:' + phone">{{phone}}</a>
</template>

<script>
    export default {
        name: 'RbPhoneLink',
        props: {
            phone: String,
        }
    }
</script>