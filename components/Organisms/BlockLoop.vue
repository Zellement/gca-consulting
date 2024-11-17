<template>
    <div class="block-loop">
        <template v-for="(entry, index) in mappedBlocks" :key="entry.id">
            <component
                :is="entry.component"
                :content="entry.content"
                :index="index"
            />
        </template>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    blocks: SectionTypesStoryblok[]
}

const props = defineProps<Props>()

// Regular expression to match the prefixes
const prefixRegex = /^(atom|molecule|section)/

const mappedBlocks: ComputedRef<MappedBlock[]> = computed(() => {
    return (
        props.blocks?.map((section: SectionTypesStoryblok) => {
            let component

            // Remove the prefix from the component name
            const componentName = section.component.replace(prefixRegex, '')

            const componentFound: boolean =
                typeof resolveComponent(componentName) !== 'string'

            if (componentFound) {
                component = resolveComponent(componentName)
            } else {
                component = resolveComponent('MissingBlock')
            }

            return {
                id: section._uid,
                component,
                content: section
            }
        }) || []
    )
})
</script>
