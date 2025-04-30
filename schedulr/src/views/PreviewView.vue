<template>
    <div class="preview-view">
        <CompPreview/>
        <p>This is the preview view where you can see a preview of your component.</p>
    </div>
</template>

<script>
import CompPreview from '@/components/CompPreview.vue';

export default {
    name: "PreviewView",
    components: {
        CompPreview
    },
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