<template>
    <div class="modification-view container py-5">
      <h1 class="text-center mb-4">Make Your Schedule</h1>
      <CompMakeSchedule />
    </div>
  </template>
  
  <script>
  import CompMakeSchedule from '@/components/CompMakeSchedule.vue';
  
  export default {
    name: "MakeScheduleView",
    components: {
      CompMakeSchedule,
    },
  };
  </script>
  
  <style scoped>
  .modification-view {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
  }
  </style>