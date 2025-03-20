<template>
    <site-header />
    <div class="page">
        <h1>Sorry, this page does not exist</h1>
        <nuxt-link to="/">Go back to the homepage</nuxt-link>
    </div>
    <site-footer />
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Sorry! Page not found'
})
</script>
