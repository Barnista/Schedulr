<template>
  <div class="about text-center py-5">
    <h1>About</h1>
    <div class="info mt-4">
      <p>
        <strong>Schedulr</strong> is a powerful tool designed to help you create visually appealing schedule
        infographics for your favorite platforms, including:
      </p>
      <ul class="list-unstyled d-flex flex-wrap justify-content-center">
        <li class="platform-item mx-4">
          <i class="bi bi-youtube me-2 text-danger"></i>YouTube
        </li>
        <li class="platform-item mx-4">
          <i class="bi bi-twitter me-2 text-primary"></i>X (formerly Twitter)
        </li>
        <li class="platform-item mx-4">
          <i class="bi bi-facebook me-2 text-primary"></i>Facebook
        </li>
        <li class="platform-item mx-4">
          <i class="bi bi-instagram me-2 text-danger"></i>Instagram
        </li>
        <li class="platform-item mx-4">
          <i class="bi bi-discord me-2 text-secondary"></i>Discord
        </li>
      </ul>
      <p>
        Whether you're a content creator, streamer, or community manager, Schedulr makes it easy to share your schedule
        with your audience in a professional and stylish way.
      </p>
    </div>

    <!-- Credits Section -->
    <div class="credits mt-5 text-muted">
      <p>Developed by <strong>barnista27</strong></p>
      <p>
        This project is proudly <strong>open-source</strong>. You can fork it and contribute on
        <a href="https://github.com/barnista27/schedulr" target="_blank" class="text-primary">
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
      <a href="https://discord.gg/SKpzUwWp" target="_blank" class="btn btn-outline-secondary me-2">
        <i class="bi bi-discord"></i> Discord
      </a>
      <a href="https://github.com/barnista27/schedulr" target="_blank" class="btn btn-outline-dark">
        <i class="bi bi-github"></i> GitHub
      </a>
    </div>
  </div>
</template>

<style scoped>
.about {
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
