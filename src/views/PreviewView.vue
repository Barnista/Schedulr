<template>
  <div class="preview-view container py-5">
    <h1 class="text-center mb-4">Preview Your Schedule</h1>
    <div class="w-100">
      <CompEmojiKeyboard class="mt-3" />
    </div>
    <div class="comp-preview container d-flex flex-column justify-content-center align-items-center">
      <textarea class="form-control fs-5 mt-3" rows="8" v-model="formData.description"
        placeholder="Description of the schedule...">
                </textarea>
      <div class="my-3">
        <button class="btn btn-success btn-lg fw-bold mt-3 d-flex align-items-center" @click="saveAsImage">
          <i class="bi bi-cloud-download me-2"></i> SAVE AS IMAGE FILE
        </button>
      </div>
      <div id="info-zone" class="info-zone">
        <h1 class="title mt-3"><span class="title-color-1">TODAY'S</span> <span class="title-color-2">SCHEDULE</span>
        </h1>
        <div class="programs-zone mt-3 d-flex flex-column justify-content-center align-items-center">
          <ul v-if="formData.programs.length > 0" class="list-group mt-3 px-5 custom-list">
            <li v-for="(program, index) in formData.programs" :key="index" class="list-group-item">
              <CompProgramItem :key="index" :program="program" :index="index" />
            </li>
          </ul>
          <p v-else class="fs-1 p-5 title-color-2 text-center">
            📅 NO PROGRAM TODAY. <br> STAY TUNED FOR MORE UPDATES! 🔔
          </p>
        </div>
      </div>
      <div class="my-3">
        <button class="btn btn-success btn-lg fw-bold mt-3" @click="saveAsImage">
          <i class="bi bi-cloud-download me-2"></i> SAVE AS IMAGE FILE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CompProgramItem from '@/components/CompProgramItem.vue';
import CompEmojiKeyboard from '@/components/Keyboards/CompEmojiKeyboard.vue';
import modelFormData from '@/models/formdata';
import { getScheduleByDate, refPrograms } from '@/services/firebase-lib';
import * as htmlToImage from 'html-to-image';
import { useCollection } from 'vuefire';
import programModule from '@/models/programs'

export default {
  name: "PreviewView",
  components: {
    CompProgramItem,
    CompEmojiKeyboard
  },
  data() {
    return {
      formData: {
        name: "",
        description: "",
        programs: [],
      },
      dateStr: this.$route.query.date ?? null,
      programs: [],
      schedules: [],
      todaySchedules: []
    }
  },
  mounted() {
    // You can add any initialization logic here if needed
    console.log("Session Storage Data:", this.formData); // If data is passed via session
    
    if (this.dateStr) {
      //SWITCH TO DATA FROM CALENDAR
      const monthStr = this.dateStr.split('-')[0] + '-' + this.dateStr.split('-')[1];
      useCollection(getScheduleByDate(monthStr)).promise.value.then(vals => {
        this.schedules = vals;

        this.filterSchedulesToday(this.dateStr);
        this.convertSchedulesToPrograms(this.todaySchedules);
        this.formData.description = programModule.generateDescription(this.formData.programs);
      });
    }else{
      //LEGACY FEATURE
      this.formData = modelFormData.get();
    }
  },
  created() {
    useCollection(refPrograms).promise.value.then(vals => {
      this.programs.push(...vals);
      console.log(this.programs);
    }).catch(error => {
      console.log(error);
    })
  },
  methods: {
    filterSchedulesToday(dateStr) {
      const d = new Date(dateStr);
      this.schedules.forEach(val => {
        const start = new Date(val.start);
        const end = new Date(val.end);

        if (d.getFullYear() == start.getFullYear()
          && d.getFullYear() == end.getFullYear()
          && d.getMonth() == start.getMonth()
          && d.getMonth() == end.getMonth()
          && d.getDate() >= start.getDate()
          && d.getDate() <= end.getDate()) {
          this.todaySchedules.push(val);
        }
      });
    },
    convertSchedulesToPrograms(schedules) {
      schedules.forEach(item => {
        const subTitle = item.title.split(':')[0];
        const p = this.programs.filter(val => val.title.toLowerCase() == subTitle.toLowerCase())[0] ?? {
          title: "UNKNOWN PROGRAM",
          cover: "",
          color: "#009cff",
          style: { color: "#009cff" },
        }

        const start = new Date(item.start);
        const end = new Date(item.end);
        const program = {
          ...p,
          start: `${start.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:${start.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`,
          end: `${end.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:${end.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`,
          ampm: ''
        }

        this.formData.programs.push(program);
      });
    },
    saveAsImage() {
      //DOCS: https://www.npmjs.com/package/html-to-image

      // Convert the HTML element to an image
      htmlToImage
        .toJpeg(document.getElementById('info-zone'), { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement('a');
          const today = new Date();
          const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
          // Set the download attribute with the formatted date
          link.download = `schedule_${formattedDate}`;
          link.href = dataUrl;
          link.click();
        });

      // Logic to save the component as an image file
      // This can be implemented using libraries like html2canvas or similar
      console.log('Save as image functionality to be implemented.');
    }
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

<style scoped>
@font-face {
  font-family: 'Valorant';
  src: url('@/assets/fonts/valorant.ttf') format('truetype');
}

.info-zone {
  background-color: #f0f0f0;
  width: 1000px;
  height: 1000px;
  background-image: url('@/assets/bg/schedule.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  padding: 48px;
  font-family: 'Valorant', Arial, sans-serif;
}

.programs-zone {
  height: calc(100% - 128px);
}

.title {
  font-size: 80px;
  font-weight: bold;
  text-align: center;
}

.title-color-1 {
  color: #eeeeee;
  /* Example color */
}

.title-color-2 {
  color: #ff5a5a;
  /* Example color */
}

/* Add component-specific styles here */


/* Custom styles for the list */
.custom-list .list-group-item {
  background-color: transparent !important;
  /* Make background transparent */
  border: none !important;
  /* Remove borders */
  color: #ffffff;
  /* Optional: Set text color for better visibility */
  font-size: 18px;
  /* Optional: Adjust font size */
  padding: 10px 15px;
  /* Optional: Adjust padding */
}

/* Align odd items to the left */
.custom-list .list-group-item:nth-child(odd) {
  text-align: left;
}

/* Align even items to the right */
.custom-list .list-group-item:nth-child(even) {
  text-align: right;
}
</style>