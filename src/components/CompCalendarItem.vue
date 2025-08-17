<template>
    <div class="comp-calendar-item">
        <div class="d-flex justify-content-center">
            <div id="info-zone" class="pb-4 pe-4 ps-3 pt-3 pb-xl-5 pe-xl-5 ps-xl-4 pt-xl-4">
                <h1 class="title text-center"><span class="title-color-1">BARNISTA'S</span> <span
                        class="title-color-2">SCHEDULE - </span>
                    <span class="title-color-3"> {{ currentMonthName.toUpperCase() }} ({{ currentMonthNumber
                        }})</span>
                </h1>
                <div class="mb-3 text-center">
                    <button class="btn btn-sm me-2 shadow-sm"
                        :class="[(viewMode == viewTypes.day) ? 'btn-outline-light bg-fabulous fw-bold' : 'btn-warning']"
                        @click="changeView(viewTypes.day)">DAILY</button>
                    <button class="btn btn-sm me-2 shadow-sm"
                        :class="[(viewMode == viewTypes.week) ? 'btn-outline-light bg-fabulous fw-bold' : 'btn-warning']"
                        @click="changeView(viewTypes.week)">WEEKLY</button>
                    <button class="btn btn-sm me-2 shadow-sm"
                        :class="[(viewMode == viewTypes.month) ? 'btn-outline-light bg-fabulous fw-bold' : 'btn-warning']"
                        @click="changeView(viewTypes.month)">THIS MONTH - {{ currentMonthName.toUpperCase() }} ({{
                            currentMonthNumber }})</button>
                </div>
                <CompTUICalendar ref="tuiCalendar" :id="'calendar'" :events="scheduleEvents"
                    @onCreateEvent="onCreateEvent" @onUpdateEvent="onUpdateEvent" @onDeleteEvent="onDeleteEvent"
                    class="full border shadow" />
            </div>
        </div>
        <div class="mb-5 text-center">
            <button class="btn btn-success shadow" @click="saveAsImage">
                <i class="bi bi-cloud-download"></i>
                SAVE AS IMAGE
            </button>
        </div>
    </div>
</template>

<script>
import CompTUICalendar from './TUICalendar/CompTUICalendar.vue';
import tuiOptions from '../models/tuiOptions';

import * as htmlToImage from 'html-to-image';
import { getCurrentUser, useCollection } from 'vuefire';
import { refScheduleEvents } from '@/services/firebase-lib';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default {
    name: 'CompCalendarItem',
    components: {
        CompTUICalendar
    },
    data: () => ({
        viewTypes: tuiOptions.viewTypes,
        viewMode: 'month',
        scheduleEvents: null,
        currentUser: null,
        currentMonthName: '',
        currentMonthNumber: new Date().getMonth() + 1
    }),
    created() {
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            this.currentUser = await getCurrentUser();

            this.$refs.tuiCalendar.renderCalendar(this.currentUser);

            useCollection(refScheduleEvents).promise.value.then(val => {
                console.log(val);
                this.scheduleEvents = val;
                this.$refs.tuiCalendar.setEvents(this.scheduleEvents);
            });

            this.changeView(this.viewMode);

            switch (this.currentMonthNumber) {
                case 1:
                    this.currentMonthName = 'January';
                    break;
                case 2:
                    this.currentMonthName = 'February';
                    break;
                case 3:
                    this.currentMonthName = 'March';
                    break;
                case 4:
                    this.currentMonthName = 'April';
                    break;
                case 5:
                    this.currentMonthName = 'May';
                    break;
                case 6:
                    this.currentMonthName = 'June';
                    break;
                case 7:
                    this.currentMonthName = 'July';
                    break;
                case 8:
                    this.currentMonthName = 'August';
                    break;
                case 9:
                    this.currentMonthName = 'September';
                    break;
                case 10:
                    this.currentMonthName = 'October';
                    break;
                case 11:
                    this.currentMonthName = 'November';
                    break;
                case 12:
                    this.currentMonthName = 'December';
                    break;
                default:
                    this.currentMonthName = '';
            }
        },
        saveAsImage() {
            //DOCS: https://www.npmjs.com/package/html-to-image

            // Convert the HTML element to an image
            let infoZone = document.getElementById('info-zone');
            infoZone.classList.add(['bg-banner']);
            htmlToImage
                .toJpeg(document.getElementById('info-zone'), { quality: 1.00 })
                .then(function (dataUrl) {
                    var link = document.createElement('a');
                    const today = new Date();
                    const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
                    // Set the download attribute with the formatted date
                    
                    link.download = `schedule_month${today.getMonth()+1}_${formattedDate}`;
                    link.href = dataUrl;
                    link.click();

                    infoZone.classList.remove(['bg-banner']);
                });

            // Logic to save the component as an image file
            // This can be implemented using libraries like html2canvas or similar
            console.log('Save as image functionality to be implemented.');
        },
        changeView(mode) {
            this.viewMode = mode;
            this.$refs.tuiCalendar.changeView(mode);
        },
        onCreateEvent(newEvent) {
            let objData = Object.assign({}, newEvent);
            objData.start = objData.start.toDate().toISOString();
            objData.end = objData.end.toDate().toISOString();

            addDoc(refScheduleEvents, objData).then((val) => {
                console.log('event added', val);
                const newId = val.id;
                this.$refs.tuiCalendar.updateEventId(objData.id, objData.calendarId, newId);
            }).catch(error => {
                console.log(error);
            });
        },
        onUpdateEvent(data) {
            console.log('id', data.id, 'changes', data.changes);

            let objData = Object.assign({}, data.changes);
            if (objData.start) objData.start = objData.start.toDate().toISOString();
            if (objData.end) objData.end = objData.end.toDate().toISOString();

            updateDoc(doc(refScheduleEvents, data.id), objData)
                .then(() => {
                    console.log('event updated', data.id);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        onDeleteEvent(id) {
            deleteDoc(doc(refScheduleEvents, id))
                .then(() => {
                    console.log('event deleted', id);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}

</script>

<style>
@font-face {
    font-family: 'Valorant';
    src: url('@/assets/fonts/valorant.ttf') format('truetype');
}

.bg-banner {
    background-image: url('@/assets/bg/bannerbg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}

#info-zone {
    width: 100%;
    max-width: 1200px;
    height: 86vh;
}

.title {
    font-family: 'Valorant', Arial, sans-serif;
    font-weight: bold;
}

.full {
    width: 100%;
    height: 88%;
}

.title-color-1 {
    color: #fff;
    /* Example color */
}

.title-color-2 {
    color: #fff;
    /* Example color */
}

.title-color-3 {
    color: #420d4f;
    text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;
    /* Example color */
}
</style>