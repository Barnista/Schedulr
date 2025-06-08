<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <i class="bi bi-calendar3 me-2"></i>Schedulr
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                <i class="bi bi-house-door me-2"></i>Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/make-schedule">
                <i class="bi bi-pencil-square me-2"></i>Make Schedule
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">
                <i class="bi bi-info me-2"></i>About
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <router-view class="flex-grow-1" />

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3">
      <p class="mb-0">v0.3.5 © 2025 Schedulr. All Rights Reserved.</p>
    </footer>
  </div>
</template>

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
</style>