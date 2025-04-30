<template>
    <div class="comp-preview">
        <div id="info-zone" class="info-zone">
            <h1 class="title mt-3"><span class="title-color-1">TODAY'S</span> <span
                    class="title-color-2">SCHEDULE</span>
            </h1>
            <ul class="list-group mt-3 px-5 custom-list">
                <li class="list-group-item">
                    <div class="d-flex flex-row">
                        <img src="@/assets/covers/cover_gta4.jpg" class="mr-2 art-cover">
                        <div class="ms-4 flex-grow-1 d-flex flex-column justify-content-center">
                            <h2 class="title-time">5 - 6.30 PM</h2>
                            <div class="divider"></div>
                            <h2 class="title-program"
                                style="color: #000; text-shadow: -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, 3px 3px 0 #fff;">
                                GTA IV</h2>
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="d-flex flex-row">
                        <div class="me-4 flex-grow-1 d-flex flex-column justify-content-center">
                            <h2 class="title-time">8.30 - 10 PM</h2>
                            <div class="divider"></div>
                            <h2 class="title-program" style="color: #ff9c00;">CIVILIZATION VI</h2>
                        </div>
                        <img src="@/assets/covers/cover_civ6.jpg" class="mr-2 art-cover">
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="d-flex flex-row">
                        <img src="@/assets/covers/cover_vscode.jpg" class="mr-2 art-cover">
                        <div class="ms-4 flex-grow-1 d-flex flex-column justify-content-center">
                            <h2 class="title-time">10 - 11.30 PM</h2>
                            <div class="divider"></div>
                            <h2 class="title-program" style="color: #009cff;">CODING</h2>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="pt-3">
            <button class="btn btn-primary btn-lg mt-3" @click="saveAsImage">SAVE AS IMAGE FILE</button>
        </div>
    </div>
</template>

<script>
import * as htmlToImage from 'html-to-image';

export default {
    name: 'CompPreview',
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
    }
};
</script>

<style scoped>
@font-face {
    font-family: 'Valorant';
    src: url('@/assets/fonts/valorant.ttf') format('truetype');
}

.comp-preview {
    font-family: 'Valorant', Arial, sans-serif;
}

.info-zone {
    background-color: #f0f0f0;
    width: 1000px;
    height: 1000px;
    background-image: url('@/assets/bg/schedule.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    padding: 48px;
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
    font-size: 72px;
    font-weight: bold;
    color: #ffffff;
    /* Example color */
}

.title-program {
    font-size: 72px;
    font-weight: bold;
    color: #ffffff;
    /* Example color */
}
</style>