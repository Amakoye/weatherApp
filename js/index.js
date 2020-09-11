if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("serviceWorker.js")
    .then((reg) => {
      console.log("Service worker registered");
      console.log(reg);
    })
    .catch((err) => {
      console.log("Registration failed");
      console.log(err);
    });
}
