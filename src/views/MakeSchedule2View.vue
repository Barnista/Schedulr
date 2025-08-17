<template>
    <div class="live-schedule-view bg-banner">
        <CompCalendarItem />
    </div>
</template>

<script>
import CompCalendarItem from '@/components/CompCalendarItem.vue';
import router from '@/router';
import { getCurrentUser } from 'vuefire';

export default {
    name: 'MakeSchedule2View',
    components: {
        CompCalendarItem
    },
    created() {
        //this.validateSignIn();
    },
    methods: {
        async validateSignIn() {
            const user = await getCurrentUser();
            if (!user) {
                console.log('already signed in');
                router.push({ name: 'sign-in' });
            }
        },
    }
}
</script>

<style>
.bg-banner {
    background-image: url('@/assets/bg/bannerv2.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}
</style>