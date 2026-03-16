const btn = document.getElementById('toggleBtn');

// Get current state
chrome.storage.sync.get('enabled', (data) => {
  btn.textContent = data.enabled ? 'Turn OFF' : 'Turn ON';
});

// Toggle state on click
btn.addEventListener('click', () => {
  chrome.storage.sync.get('enabled', (data) => {
    const newState = !data.enabled;
    chrome.storage.sync.set({ enabled: newState }, () => {
      btn.textContent = newState ? 'Turn OFF' : 'Turn ON';
      // Reload the active YouTube tab to apply changes
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });
});