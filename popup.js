document.addEventListener("DOMContentLoaded", () => {
    const timerDisplay = document.getElementById("timer");
    const startButton = document.getElementById("start");
    const stopButton = document.getElementById("stop");
    const resetButton = document.getElementById("reset");
  
    function updateTimerDisplay(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
  
    chrome.storage.local.get("timeLeft", (result) => {
      const timeLeft = result.timeLeft ?? 1500;
      updateTimerDisplay(timeLeft);
    });
  
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.timeLeft) {
        updateTimerDisplay(changes.timeLeft.newValue);
      }
    });
  
    startButton.addEventListener("click", () => {
      chrome.runtime.sendMessage({ command: "start" });
    });
  
    stopButton.addEventListener("click", () => {
      chrome.runtime.sendMessage({ command: "stop" });
    });
  
    resetButton.addEventListener("click", () => {
      chrome.runtime.sendMessage({ command: "reset" });
    });
  });
