<template>
    <div class="sign-in-view">
        <div class="sign-in-panel rounded border shadow-lg p-4 pb-5 mt-5">
            <h2 class="mb-3">Admin Sign In</h2>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" v-model="email" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" v-model="password" @keyup.enter="signIn" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="text-end">
                <button class="btn btn-primary px-3" @click="signIn">Sign In</button>
                <p v-if="error" class="text-danger">{{ error }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getCurrentUser } from 'vuefire';

export default {
    name: 'SignInView',
    data: () => ({
        email: null,
        password: null,
        error: null
    }),
    created() {
        this.validateSignIn();
    },
    methods: {
        async validateSignIn() {
            const user = await getCurrentUser();
            if (user) {
                console.log('already signed in', user);
                router.push({ name: 'home' }).then(() => {
                    //force reload
                    router.go(0);
                });
            }
        },
        signIn() {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password).then(() => {
                console.log('sign in success');
                router.push({ name: 'home' }).then(() => {
                    //force reload
                    router.go(0);
                });
            }).catch(error => {
                console.log('error', error);
                this.error = 'User or password is not correct.';
            });
        }
    }
}
</script>

<style scoped>
.sign-in-panel {
    max-width: 600px;
    margin: auto;
}
</style>