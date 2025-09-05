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
          <CompScheduleItem v-model="formData.programs[index]" :timeranges="timeranges" :ampm="ampm"
            :programs="programs" @delete-item="deleteItem(index)"></CompScheduleItem>
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
import modelTimeranges from "@/models/timeranges";
import { refPrograms } from "@/services/firebase-lib";
import { useCollection } from "vuefire";
import programModule from '@/models/programs';

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
      programs: [],
      formData: modelFormData.get(),
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      try {
        this.programs = await useCollection(refPrograms).promise.value;
      } catch (error) {
        console.log(error);
      }
    },
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

      let xFormData = Object.assign({}, this.formData);

      // Validate form data before proceeding
      const isValid = xFormData.programs.every((program) => {
        return program.start !== "" && program.end !== "" && program.ampm !== "" && program.program;
      });

      if (!isValid) {
        alert("Please fill in all fields for each program.");
        return;
      }

      //extract program data
      let programs = [];
      xFormData.programs.forEach(val => {
        const nval = {
          ...val,
          ...val.program
        };
        programs.push(nval);
      });
      xFormData.programs = programs;

      // Generate description based on the form data
      xFormData.description = programModule.generateDescription(xFormData.programs);


      // Save form data to session storage
      modelFormData.set(xFormData);

      // Redirect to the preview page
      this.$router.push({
        path: '/preview',
      });
    }
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