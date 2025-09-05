<template>

    <div class="d-flex justify-content-between">
        <div class="form-group text-start me-3">
            <label>Start At: </label>
            <select v-model="localProgram.start" @change="triggerChange" class="form-select"
                aria-label="Default select example">
                <option value="" selected>Pick time</option>
                <option v-for="(time, index) in timeranges" :key="index" :value="time">{{ time }}</option>
            </select>
        </div>
        <div class="form-group text-start me-3">
            <label>End At: </label>
            <select v-model="localProgram.end" @change="triggerChange" class="form-select"
                aria-label="Default select example">
                <option value="" selected>Pick time</option>
                <option v-for="(time, index) in timeranges" :key="index" :value="time">{{ time }}</option>
            </select>
        </div>
        <!--<div class="form-group text-start me-3">
            <label>AM/PM: </label>
            <select v-model="localProgram.ampm" @change="triggerChange" class="form-select" aria-label="Default select example">
                <option value="" selected>Pick AM/PM</option>
                <option v-for="(period, index) in ampm" :key="index" :value="period">{{ period }}</option>
            </select>
        </div>-->
        <div class="form-group text-start me-3">
            <label>Program: </label>
            <select v-model="localProgram.program" @change="triggerChange" class="form-select"
                aria-label="Default select example">
                <option value="" selected>Choose your program</option>
                <option v-for="(programOption, index) in programs" :key="index" :value="programOption">
                    {{ programOption.title }}
                </option>
            </select>
        </div>
        <!-- Delete Button with Icon -->
        <button @click="deleteItem" class="btn btn-outline-secondary ms-auto">
            <i class="bi bi-trash me-2"></i> Delete
        </button>
    </div>
</template>

<script>
export default {
    name: "ScheduleItem",
    props: {
        modelValue: {
            type: Object,
            required: true,
        },
        timeranges: {
            type: Array,
            required: true,
        },
        ampm: {
            type: Array,
            required: true,
        },
        programs: {
            type: Array,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            localProgram: this.modelValue ? { ...this.modelValue } : { start: "", end: "", ampm: "PM", program: {} }, // Create a local copy of the program
        };
    },
    emits: ["update:modelValue"],
    watch: {
        program: {
            deep: true,
            handler(newValue) {
                console.log("Program changed:", newValue);
                this.$emit("update:modelValue", newValue); // Emit changes to the parent
            },
        },
    },
    methods: {
        deleteItem() {
            this.$emit("delete-item", this.index);
        },
        triggerChange() {
            console.log("Program changed:", this.localProgram);
            this.$emit("update:modelValue", this.localProgram); // Emit changes to the parent
        },
    },
};
</script>
