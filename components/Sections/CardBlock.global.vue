<template>
    <div class="container grid-layout container-px">
        <single-card
            v-for="card in content.cards"
            :key="card.uuid"
            :url="card.full_slug"
            :name="card.name"
            :img-data="{
                url: card.content.hero?.[0]?.media.filename,
                alt: card.content.hero?.[0]?.media.alt
            }"
            :overview="card.content.pageOverview"
        />
    </div>
</template>

<script lang="ts" setup>
interface Props {
    content: SectionCardBlockStoryblok
}

defineProps<Props>()
</script>
