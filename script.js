document.addEventListener("DOMContentLoaded", function () {
  const colorPicker = document.getElementById("colorPicker");
  const hexValue = document.getElementById("hexValue");
  const rgbValue = document.getElementById("rgbValue");
  const copyHexBtn = document.getElementById("copyHexBtn");
  const copyRgbBtn = document.getElementById("copyRgbBtn");

  // Function to update color values
  function updateColorValues(color) {
    hexValue.textContent = color;
    const rgb = hexToRgb(color);
    rgbValue.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }

  // Convert hex to RGB
  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }

  // Copy text to clipboard using Clipboard API with fallback
  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert(`Copied to clipboard: ${text}`);
      }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy. Please try again.');
      });
    } else {
      fallbackCopyTextToClipboard(text);
    }
  }

  // Fallback method for older browsers
  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Prevent scrolling to the bottom of the page
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      alert('Copied to clipboard (Fallback): ' + text);
    } catch (err) {
      console.error('Fallback: Could not copy text: ', err);
    }
    document.body.removeChild(textArea);
  }

  // Copy Hex to clipboard
  function copyHexToClipboard() {
    const hexText = hexValue.textContent;
    copyToClipboard(hexText);
  }

  // Copy RGB to clipboard
  function copyRgbToClipboard() {
    const rgbText = rgbValue.textContent;
    copyToClipboard(rgbText);
  }

  // Event listener for color picker
  colorPicker.addEventListener("input", (e) => {
    updateColorValues(e.target.value);
  });

  // Event listeners for copy buttons
  copyHexBtn.addEventListener("click", copyHexToClipboard);
  copyRgbBtn.addEventListener("click", copyRgbToClipboard);

  // Initial value update
  updateColorValues(colorPicker.value);
});
