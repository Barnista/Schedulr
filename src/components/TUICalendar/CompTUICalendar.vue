<template>
    <div class="comp-tui-calendar" :id="id"></div>
</template>

<script>
import Calendar from '@toast-ui/calendar';
import tuiOptions from '../../models/tuiOptions';

import '@toast-ui/calendar/dist/toastui-calendar.min.css';
// Load css files of tui-date-picker and tui-time-picker to use the event form popup.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import * as uuid from 'uuid';

export default {
    name: 'CompTUICalendar',
    props: {
        id: {
            type: String,
            default: 'calendar'
        },
    },
    data: () => ({
        calendar: null,
        viewType: 'month',
        events: null,
        currentUser: null
    }),
    mounted() {

    },
    methods: {
        renderCalendar(currentUser) {
            this.currentUser = currentUser;

            this.calendar = new Calendar(`#${this.id}`, {
                defaultView: this.viewType,
                useFormPopup: (this.currentUser) ? true : false,
                useDetailPopup: true,
                isReadOnly: (this.currentUser) ? false : true,
                timezone: { zones: [{ timezoneName: 'Asia/Bangkok' }] },
                week: {
                    taskView: false,
                    startDayOfWeek: 1 // 0: Sunday, 1: Monday
                },
                month: {
                    startDayOfWeek: 1
                },
                calendars: tuiOptions.calendarCategories
            });

            // Creating an event through popup
            this.calendar.on('beforeCreateEvent', this.onBeforeCreateEvent);

            // Basic example of updating an event
            this.calendar.on('beforeUpdateEvent', this.onBeforeUpdateEvent);

            // Basic example of deleting an event
            this.calendar.on('beforeDeleteEvent', this.onBeforeDeleteEvent);
        },
        setEvents(events) {
            this.events = events;
            if (!this.currentUser) this.events.forEach(ev => {
                ev.isReadOnly = true
            });
            this.calendar.createEvents(this.events);
        },
        changeView(mode) {
            this.viewType = mode;
            this.calendar.changeView(mode, true);

            if (this.viewType === tuiOptions.viewTypes.day || this.viewType === tuiOptions.viewTypes.week) {
                this.calendar.scrollToNow('smooth');
            }
        },
        onBeforeCreateEvent(eventObj) {
            const newEvent = {
                ...eventObj,
                id: uuid.v4(),
                customStyle: {
                    fontStyle: 'italic'
                }
            };
            this.calendar.createEvents([
                newEvent
            ]);
            this.$emit('onCreateEvent', newEvent);
        },
        onBeforeUpdateEvent(eventObj) {
            const event = eventObj.event;
            const changes = eventObj.changes;
            this.calendar.updateEvent(event.id, event.calendarId, changes);
            this.$emit('onUpdateEvent', {
                id: event.id,
                changes: changes
            });
        },
        onBeforeDeleteEvent(eventObj) {
            this.calendar.deleteEvent(eventObj.id, eventObj.calendarId);
            this.$emit('onDeleteEvent', eventObj.id);
        },
        updateEventId(oldId, calendarId, newId) {
            this.calendar.updateEvent(oldId, calendarId, {
                id: newId
            });
        }
    }
}
</script>