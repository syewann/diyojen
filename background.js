let timer = null;
let timeLeft = 1500; // 25 minutes in seconds

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "start") {
    if (!timer) {
      timer = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          chrome.storage.local.set({ timeLeft });
        } else {
          clearInterval(timer);
          timer = null;
          chrome.notifications.create({
            type: "basic",
            iconUrl: "potato-16.png",
            title: "Pomodoro Complete!",
            message: "Time to take a break!"
          });
        }
      }, 1000);
    }
  } else if (message.command === "stop") {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  } else if (message.command === "reset") {
    timeLeft = 1500;
    chrome.storage.local.set({ timeLeft });
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  sendResponse({ status: "ok" });
});
