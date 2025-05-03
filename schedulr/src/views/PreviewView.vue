<template>
    <div class="preview-view container py-5">
      <h1 class="text-center mb-4">Preview Your Schedule</h1>
      <CompPreview />
    </div>
  </template>
  
  <script>
  import CompPreview from '@/components/CompPreview.vue';
  
  export default {
    name: "PreviewView",
    components: {
      CompPreview,
    },
  };
  </script>
  
  <style scoped>
  .preview-view {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
  }
  </style>