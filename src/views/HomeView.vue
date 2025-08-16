<template>
  <div class="home text-center py-5">
    <h1 class="display-4">Welcome to Schedulr 2</h1>
    <p class="lead">Plan your whole months with ease and style.</p>
    <div class="info mt-2">
      <router-link to="/live-schedule" class="btn btn-primary btn-lg shadow-lg">
        <i class="bi bi-calendar-heart me-2"></i>Barnista's LIVE Schedule
      </router-link>
    </div>
    <div>
      <router-link to="/make-schedule" class="btn btn-outline-secondary btn-lg">
        <i class="bi bi-pencil-square me-2"></i>DIY Schedule
      </router-link>
    </div>

    <!-- Credits Section -->
    <div class="credits mt-5 text-muted">
      <p>Developed by <strong>Barnista</strong></p>
      <p>
        This project is proudly <strong>open-source</strong>. You can fork it and contribute on
        <a href="https://github.com/Barnista/Schedulr" target="_blank" class="text-primary">
          <i class="bi bi-github me-1"></i>GitHub
        </a>.
      </p>
    </div>

    <!-- Social Media Links -->
    <div class="social-links mt-4">
      <a href="https://www.youtube.com/@barnista27" target="_blank" class="btn btn-outline-danger me-2">
        <i class="bi bi-youtube"></i> YouTube
      </a>
      <a href="https://x.com/barnista27" target="_blank" class="btn btn-outline-primary me-2">
        <i class="bi bi-twitter"></i> X
      </a>
      <a href="https://www.facebook.com/profile.php?id=61574757156088" target="_blank"
        class="btn btn-outline-primary me-2">
        <i class="bi bi-facebook"></i> Facebook
      </a>
      <a href=" https://discord.gg/GSZeRZaVZb" target="_blank" class="btn btn-outline-secondary me-2">
        <i class="bi bi-discord"></i> Discord
      </a>
      <a href="https://github.com/Barnista/Schedulr" target="_blank" class="btn btn-outline-dark">
        <i class="bi bi-github"></i> GitHub
      </a>
    </div>

    <!-- Example Deployment on Home Server -->
    <div class="mt-4">
      <p class="text-muted">
        Example deployment on Firebase Hosting:
        <a href="https://barnista-schedulr.web.app/" target="_blank" class="text-primary">
          <i class="bi bi-link-45deg me-1"></i>Schedulr 2
        </a>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: "HomeView",
  components: {

  }
};
</script>

<style scoped>
.home {
  background-color: #f8f9fa;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.info {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

ul {
  text-align: left;
  display: inline-block;
  margin-top: 10px;
}

ul li {
  margin-bottom: 10px;
  font-size: 1.1rem;
}

ul li i {
  font-size: 1.5rem;
  vertical-align: middle;
}
</style>