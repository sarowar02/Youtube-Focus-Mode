chrome.storage.sync.get('enabled', (data) => {
  if (data.enabled) {
    const style = document.createElement('style');
    style.innerHTML = `
      ytd-browse[page-subtype="home"] #contents,
      #secondary #related,
      #comments,
      ytd-guide-entry-renderer:has(a[title="Shorts"]) {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // Add the focus message logic from before
    const observer = new MutationObserver(() => {
        const container = document.querySelector('ytd-browse[page-subtype="home"]');
        if (container && !document.getElementById("focus-message")) {
            const msg = document.createElement("h1");
            msg.id = "focus-message";
            msg.innerText = "Focus Mode Active";
            msg.style = "color: white; text-align: center; margin-top: 50px;";
            container.appendChild(msg);
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
});