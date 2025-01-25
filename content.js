// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.simplifiedText) {
    hideLoadingAnimation();
    showResponseBlock(message.simplifiedText);
  } else if (message.error) {
    hideLoadingAnimation();
    alert(message.error); // Display the error message
  }
});

// Function to display the response on the webpage
function showResponseBlock(text) {
  const responseBlockId = "text-simplifier-response";

  // Remove any existing response block
  const existingResponse = document.getElementById(responseBlockId);
  if (existingResponse) existingResponse.remove();

  // Create and display the response block
  const responseBlock = document.createElement("div");
  responseBlock.id = responseBlockId;
  responseBlock.style.position = "fixed";
  responseBlock.style.top = "10%";
  responseBlock.style.right = "10px";
  responseBlock.style.width = "300px";
  responseBlock.style.padding = "10px";
  responseBlock.style.backgroundColor = "#f9f9f9";
  responseBlock.style.border = "1px solid #ccc";
  responseBlock.style.borderRadius = "5px";
  responseBlock.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  responseBlock.style.zIndex = "10000";
  responseBlock.style.fontFamily = "Arial, sans-serif";
  responseBlock.style.fontSize = "14px";
  responseBlock.style.color = "#333";

  // Create a close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "×";
  closeButton.style.position = "absolute";
  closeButton.style.top = "5px";
  closeButton.style.right = "5px";
  closeButton.style.background = "none";
  closeButton.style.border = "none";
  closeButton.style.fontSize = "16px";
  closeButton.style.cursor = "pointer";
  closeButton.style.color = "#333";

  // Add click event to close the response block
  closeButton.addEventListener("click", () => {
    responseBlock.remove();
  });

  // Add the close button to the response block
  responseBlock.appendChild(closeButton);

  // Add the text content to the response block
  const responseText = document.createElement("div");
  responseText.textContent = text;
  responseBlock.appendChild(responseText);

  document.body.appendChild(responseBlock);
}

// Function to show a loading animation
function showLoadingAnimation() {
  const loadingAnimationId = "loading-animation";

  // Remove any existing loading animation
  const existingLoading = document.getElementById(loadingAnimationId);
  if (existingLoading) existingLoading.remove();

  // Create and display the loading animation
  const loadingAnimation = document.createElement("div");
  loadingAnimation.id = loadingAnimationId;
  loadingAnimation.style.position = "fixed";
  loadingAnimation.style.top = "50%";
  loadingAnimation.style.left = "50%";
  loadingAnimation.style.transform = "translate(-50%, -50%)";
  loadingAnimation.style.width = "50px";
  loadingAnimation.style.height = "50px";
  loadingAnimation.style.border = "5px solid #ccc";
  loadingAnimation.style.borderTop = "5px solid #333";
  loadingAnimation.style.borderRadius = "50%";
  loadingAnimation.style.animation = "spin 1s linear infinite";
  loadingAnimation.style.zIndex = "10001";

  document.body.appendChild(loadingAnimation);

  // Add CSS for the spinning animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

// Function to hide the loading animation
function hideLoadingAnimation() {
  const loadingAnimation = document.getElementById("loading-animation");
  if (loadingAnimation) loadingAnimation.remove();
}

// Show loading animation when a request is initiated
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "showLoading") {
    showLoadingAnimation();
  }
});
