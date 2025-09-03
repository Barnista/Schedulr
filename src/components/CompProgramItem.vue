<template>
    <div class="d-flex flex-row">
        <img v-if="index % 2 == 0" :src="program.cover" class="mr-2 me-4 art-cover">
        <div class="flex-grow-1 d-flex flex-column justify-content-center">
            <h2 class="title-time">{{ program.start }} - {{ program.end }}
            </h2>
            <div class="divider"></div>
            <h2 class="title-program" :style="program.style">{{
                program.title }}</h2>
        </div>
        <img v-if="index % 2 == 1" :src="program.cover" class="mr-2 ms-4 art-cover">
    </div>
</template>

<script>
export default {
    name: 'ProgramItem',
    props: {
        program: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    }
};
</script>

<style scoped>
/* Add your styles here */

.art-cover {
  width: 180px;
  /* Adjust the width as needed */
  height: 240px;
  /* Adjust the height as needed */
  margin-right: 10px;
  /* Space between image and text */
  vertical-align: middle;
  /* Align image vertically with text */
}

.divider {
  width: 100%;
  height: 6px;
  background-color: #7f7f7f;
  /* Example color */
  margin: 10px 0;
  /* Space above and below the divider */
}

.title-time {
  font-size: 60px;
  font-weight: bold;
  color: #ffffff;
  /* Example color */
}

.title-program {
  font-size: 60px;
  font-weight: bold;
  color: #ffffff;
  /* Example color */
}
</style>