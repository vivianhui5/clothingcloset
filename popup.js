document.getElementById('extractButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: ['config.js'],
        },
        () => {
          chrome.scripting.executeScript(
            {
              target: { tabId: tabs[0].id },
              func: extractCartInfo
            },
            (results) => {
              if (results && results[0]) {
                const csvContent = convertToCSV(results[0].result);
                downloadCSV(csvContent, 'shopping_cart.csv');
              }
            }
          );
        }
      );
    });
  });
  
  function extractCartInfo() {
    const config = window.getSiteConfig(); // Retrieve the configuration for the current site
    console.log('Using configuration for:', config.brandName); // Log the brand name to verify the configuration
    if (!config.brandName) {
      console.log('No valid configuration found.'); // Additional check if no valid config
      return [];
    }
  
    const itemSelector = config.itemSelector;
    const imageSelector = config.imageSelector;
    const brandName = config.brandName;
  
    const cartItems = document.querySelectorAll(itemSelector);
    const cartData = [];
  
    cartItems.forEach(item => {
      const nameElement = item;
      const nameText = nameElement ? nameElement.childNodes[0].textContent.trim() : 'Unknown'; // Only get the first text node
  
      const imageElement = item.closest('.c-pwa-cart-item').querySelector(imageSelector);
  
      const name = nameText || 'Unknown';
      const imageUrl = imageElement ? imageElement.src : 'No Image';
      const brand = brandName || 'Unknown';
  
      console.log('Item:', { name, brand, imageUrl }); // Log the extracted data
  
      cartData.push({ name, brand, imageUrl });
    });
  
    return cartData;
  }
  
  function convertToCSV(data) {
    const header = ['Name', 'Brand', 'Image URL'];
    const rows = data.map(item => [item.name, item.brand, item.imageUrl]);
  
    const csvContent = [header, ...rows].map(e => e.join(",")).join("\n");
    return csvContent;
  }
  
  function downloadCSV(csvContent, fileName) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  }
  