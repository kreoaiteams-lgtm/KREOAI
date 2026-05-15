
console.log("[3D Converter] Скрипты запрошены, ожидаем инициализации...");

// 3D Converter logic as seen in user logs
function initialize3DConverter() {
    console.log("[3D Converter] ✓ Все скрипты доступны");
    
    // Watch for new video elements
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeName === 'VIDEO') {
                    processVideoElement(node);
                } else if (node.querySelectorAll) {
                    node.querySelectorAll('video').forEach(processVideoElement);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    // Process existing videos
    document.querySelectorAll('video').forEach(processVideoElement);
}

function processVideoElement(video) {
    if (video.dataset.converterId) return;

    const converterId = `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    video.dataset.converterId = converterId;
    
    console.log(`[3D Converter] Найдено новое видео элемент:`, video);
}

// Relay messages from the page to the background script
// This allows the web app to use window.postMessage to talk to the background script
window.addEventListener("message", (event) => {
    if (event.source !== window || !event.data || event.data.source !== "KREO_APP") return;

    if (event.data.type === "KREO_PROXY_REQUEST") {
        chrome.runtime.sendMessage(event.data, (response) => {
            window.postMessage({
                source: "KREO_EXTENSION",
                requestId: event.data.requestId,
                response: response
            }, "*");
        });
    }
});

// Run initialization
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize3DConverter);
} else {
    initialize3DConverter();
}
