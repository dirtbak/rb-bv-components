<template>
    <a :href="'mailto:' + email" class="rb-email-link">{{email}}</a>
</template>

<script>
    export default {
        name: 'RbEmailLink',
        props: {
            email: String
        }
    }
</script>