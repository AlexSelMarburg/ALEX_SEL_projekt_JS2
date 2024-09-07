export function initOptions() {
  const toggleFullscreenBtn = document.querySelector("#toggel-fullscreen-btn");

  toggleFullscreenBtn.addEventListener("click", function (e) {
    if (!document.fullscreenElement) {
      this.querySelector("img").src = "assets/img/HUD/fullscreen_exit.png";
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      this.querySelector("img").src = "assets/img/HUD/fullscreen.png";
      document.exitFullscreen();
    }
  });
}

export function serviceWorkerAktiv() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../service-worker.js", { scope: "./" });
  }
}
