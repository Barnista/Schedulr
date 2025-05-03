<template>
    <div class="comp-preview container d-flex flex-column justify-content-center align-items-center">

        <textarea class="form-control mt-3" rows="8" v-model="formData.description"
            placeholder="Description of the schedule...">
                </textarea>
        <div class="my-3">
            <button class="btn btn-success btn-lg fw-bold mt-3" @click="saveAsImage">SAVE AS IMAGE FILE</button>
        </div>
        <div id="info-zone" class="info-zone">
            <h1 class="title mt-3"><span class="title-color-1">TODAY'S</span> <span
                    class="title-color-2">SCHEDULE</span>
            </h1>
            <div class="programs-zone mt-3 d-flex flex-column justify-content-center align-items-center">
                <ul v-if="formData.programs.length > 0" class="list-group mt-3 px-5 custom-list">
                    <li v-for="(program, index) in formData.programs" :key="index" class="list-group-item">
                        <div class="d-flex flex-row">
                            <img v-if="index % 2 == 0" :src="require(`@/assets/${program.program.cover}`)"
                                class="mr-2 me-4 art-cover">
                            <div class="flex-grow-1 d-flex flex-column justify-content-center">
                                <h2 class="title-time">{{ program.start }} - {{ program.end }} {{ program.ampm }}
                                </h2>
                                <div class="divider"></div>
                                <h2 class="title-program" :style="{ color: program.program.color }">{{
                                    program.program.title }}</h2>
                            </div>
                            <img v-if="index % 2 == 1" :src="require(`@/assets/${program.program.cover}`)"
                                class="mr-2 ms-4 art-cover">
                        </div>
                    </li>
                </ul>
                <p v-else class="fs-1 p-5 title-color-2 text-center">
                    📅 NO PROGRAM TODAY. <br> STAY TUNED FOR MORE UPDATES! 🔔
                </p>
            </div>
        </div>
        <div class="my-3">
            <button class="btn btn-success btn-lg fw-bold mt-3" @click="saveAsImage">SAVE AS IMAGE FILE</button>
        </div>
    </div>
</template>

<script>
import * as htmlToImage from 'html-to-image';

export default {
    name: 'CompPreview',
    data() {
        return {
            formData: sessionStorage.getItem('formData') ? JSON.parse(sessionStorage.getItem('formData')) : {
                name: "",
                description: "",
                programs: [],
            },
        }
    },
    methods: {
        saveAsImage() {
            //DOCS: https://www.npmjs.com/package/html-to-image

            htmlToImage
                .toJpeg(document.getElementById('info-zone'), { quality: 0.95 })
                .then(function (dataUrl) {
                    var link = document.createElement('a');
                    link.download = 'my-image-name.jpeg';
                    link.href = dataUrl;
                    link.click();
                });

            // Logic to save the component as an image file
            // This can be implemented using libraries like html2canvas or similar
            console.log('Save as image functionality to be implemented.');
        }
    },
    mounted() {
        // You can add any initialization logic here if needed
        console.log("Session Storage Data:", this.formData); // If data is passed via session


    }
};
</script>

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