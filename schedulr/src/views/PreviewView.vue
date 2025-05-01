<template>
    <div class="preview-view">
        <h1>PREVIEW DESCRIPTION & IMAGE</h1>
        <CompPreview class="pb-5"/>
    </div>
</template>

<script>
import CompPreview from '@/components/CompPreview.vue';

export default {
    name: "PreviewView",
    components: {
        CompPreview
    },
    mounted() {
        // You can add any initialization logic here if needed
    }
};
</script>

<style scoped>
.preview-view {
    padding: 20px;
    font-family: Arial, sans-serif;
}

h1 {
    color: #333;
}

p {
    color: #666;
}
</style>