<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <i class="bi bi-calendar3 me-2"></i>Schedulr 2
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/live-schedule">
                <i class="bi bi-calendar-heart me-2"></i>LIVE Schedule
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/make-schedule">
                <i class="bi bi-pencil-square me-2"></i>DIY Schedule
              </router-link>
            </li>
            <li v-if="!currentUser" class="nav-item">
              <router-link class="nav-link" to="/sign-in">
                <i class="bi bi-box-arrow-in-right me-2"></i>Sign In
              </router-link>
            </li>
            <li v-if="currentUser" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                {{ currentUser.email }}
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="doSignOut">Sign Out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <router-view class="flex-grow-1" />

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3">
      <p class="mb-0">v2.1.0 © 2025 Schedulr. All Rights Reserved. <router-link to="/about">
          About Us.
        </router-link></p>
    </footer>
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
import { getCurrentUser } from 'vuefire';

export default {
  data: () => ({
    currentUser: null
  }),
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.currentUser = await getCurrentUser();
      console.log(this.currentUser)
    },
    doSignOut(){
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$router.go();
      }).catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

footer {
  margin-top: auto;
}

.bg-fabulous {
    background: linear-gradient(90deg, #ff8a00, #e52e71, #4a90e2, #ff8a00);
    background-size: 400% 400%;
    animation: gradient-flash 8s linear infinite;
    color: #fff !important;
}

@keyframes gradient-flash {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>