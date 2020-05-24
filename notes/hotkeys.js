/* global chrome, document */

const toggleFocus = () => {
  chrome.storage.local.get(["focus"], local => {
    chrome.storage.local.set({ focus: !local.focus });
  });
};

const register = (state) => document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "[") {
    state.previousNote();
    return;
  }

  if ((event.metaKey || event.ctrlKey) && event.key === "]") {
    state.nextNote();
    return;
  }

  if ((event.metaKey || event.ctrlKey) && event.shiftKey && (event.key === "F" || event.key === "f")) {
    state.active && toggleFocus(); // toggle focus only when a note is open
    return;
  }
});

export default { register };
