<template>
    <div class="modification-view">
        <h1>SET YOUR SCHEDULE</h1>
        <div class="container">
        <CompModify/>
        </div>
    </div>
</template>

<script>
import CompModify from '@/components/CompModify.vue';

export default {
    name: "ModificationView",
    components: {
        CompModify,
    },
    data() {
        return {
            formData: {
                name: "",
                description: "",
            },
        };
    },
    methods: {
        handleSubmit() {
            console.log("Form submitted:", this.formData);
            // Add your logic to handle form submission
        },
    },
};
</script>

<style scoped>
.modification-view {
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input,
textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
</style>