<template>
  <div class="modification-view container py-5 bg-light">
    <h1 class="text-center mb-4">Make Your Schedule</h1>
    <div class="comp-modify">
      <div class="d-flex flex-row-reverse">
        <!-- Add Button with Icon -->
        <button @click="addItem" class="btn btn-success btn-lg mt-3">
          <i class="bi bi-plus-circle me-2"></i> Add
        </button>
      </div>
      <ul class="list-group mt-3">
        <li v-for="(program, index) in formData.programs" :key="index" class="list-group-item">
          <CompScheduleItem v-model="formData.programs[index]" :timeranges="timeranges" :ampm="ampm" :programs="programs"
            @delete-item="deleteItem(index)"></CompScheduleItem>
        </li>
      </ul>
      <p v-if="formData.programs.length == 0" class="p-5 text-muted text-center">
        You haven't added any program yet. Please add a program to your schedule.
        <br> You can add multiple programs to your schedule.
      </p>
      <div class="px-5 mt-4">
        <!-- Submit Button with Icon -->
        <button @click="handleSubmit()" class="btn btn-primary btn-lg w-100 mt-3">
          <i class="bi bi-check-circle me-2"></i> Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CompScheduleItem from "@/components/CompScheduleItem.vue";
import modelAMPM from "@/models/ampm";
import modelFormData from "@/models/formdata";
import modelPrograms from "@/models/programs.js"; // Assuming you have a file with program data
import modelTimeranges from "@/models/timeranges";

export default {
  name: "MakeScheduleView",
  components: {
    CompScheduleItem
  },
  data() {
    return {
      // Initialize the timeranges, ampm, programs, and formData from the imported models
      timeranges: modelTimeranges,
      ampm: modelAMPM,
      programs: modelPrograms,
      formData: modelFormData.get(),
    };
  },
  methods: {
    deleteItem(index) {
      // Remove the program object from the programs array at the specified index
      this.formData.programs.splice(index, 1);
    },
    addItem() {
      // Add a new program object to the programs array
      this.formData.programs.push({ start: "", end: "", ampm: "PM", program: {} });
    },
    handleSubmit() {
      console.log("Form submitted:", this.formData);

      // Validate form data before proceeding
      const isValid = this.formData.programs.every((program) => {
        return program.start !== "" && program.end !== "" && program.ampm !== "" && program.program;
      });

      if (!isValid) {
        alert("Please fill in all fields for each program.");
        return;
      }

      // Generate description based on the form data
      this.formData.description = this.generateDescription();

      // Save form data to session storage
      modelFormData.set(this.formData);

      // Redirect to the preview page
      this.$router.push({
        path: '/preview',
      });
    },
    generateDescription() {
      // Generate a description based on the form data
      let description = ``;

      if (this.formData.programs.length == 0) {
        description = `แชทวันนี้ไม่มีรายการ live stream\n\n`;
        description += `เนื่องจาก....`;
        return description;
      }

      description = `แชทวันนี้เรามีรายการ live stream\n\n`
      this.formData.programs.forEach((program) => {
        description += `${program.start} - ${program.end} ${program.ampm} (UTC+7): ${program.program.title}\n`;
      });
      description += `\nดู LIVE: https://www.twitch.tv/barnista27`;
      return description;
    },
  },
};
</script>

<style scoped>
.modification-view {
  border-radius: 8px;
  padding: 20px;
}
</style>

<style scoped>
.comp-modify {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>