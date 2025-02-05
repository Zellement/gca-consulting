<template>
    <div class="container grid-layout container-px">
        <template v-for="card in content.cards" :key="card.uuid">
            <single-card
                v-if="card.content"
                :url="card.full_slug"
                :name="card.name"
                :img-data="{
                    url: card.content?.hero?.[0]?.media?.filename,
                    alt: card.content?.hero?.[0]?.media?.alt
                }"
                :overview="card?.content?.pageOverview"
            />
        </template>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    content: SectionCardBlockStoryblok
}

defineProps<Props>()
</script>
