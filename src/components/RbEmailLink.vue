<template>
    <a :href="'mailto:' + email" class="rb-email-link"
       :target="openInNewTab? '_blank': '_self'">{{email}}</a>
</template>

<script>
    export default {
        name: 'RbEmailLink',
        props: {
            email: String,
            openInNewTab: {type: Boolean, default: true}
        }
    }
</script>
