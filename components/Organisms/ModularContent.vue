<template>
    <div class="modular-content">
        <template v-for="entry in mappedBlocks" :key="entry.id">
            <client-only v-if="entry.clientOnly">
                <component
                    :is="entry.component"
                    :content="entry.content"
                    :content-type="entry.contentType"
                />
            </client-only>
            <component
                :is="entry.component"
                v-else
                :content="entry.content"
                :content-type="entry.contentType"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import { type DefineComponent } from 'vue'
import MissingBlock from '@blocks/MissingBlock.vue'

interface Block {
    id: string
    componentName: string
}

interface MappedBlock {
    id: string
    component: DefineComponent<object, object, any>
    clientOnly?: boolean
    content?: object
    contentType?: string
}

const { retrieveComponent } = useModularContentUtils()

// Computed
const content: ComputedRef<Block[]> = computed(() => {
    return [
        {
            id: 'kitchenSink',
            componentName: 'KitchenSink'
        }
    ]
})

const mappedBlocks: ComputedRef<MappedBlock[]> = computed(() => {
    return (
        content.value?.map((block: Block) => {
            const targetComponent = retrieveComponent[block.componentName]

            if (!targetComponent) {
                return {
                    id: block.id,
                    component: MissingBlock,
                    clientOnly: true,
                    content: {}
                } as MappedBlock
            }

            const { component, clientOnly } = targetComponent

            return {
                id: block.id,
                component,
                clientOnly
            } as MappedBlock
        }) || []
    )
})
</script>
