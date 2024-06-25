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
  console.log('Config:', config); // Additional log to inspect the config object
  if (!config.brandName) {
    console.log('No valid configuration found.'); // Additional check if no valid config
    return [];
  }

  const cartItemSelector = config.cartItemSelector;
  const itemSelector = config.itemSelector;
  const imageSelector = config.imageSelector;
  const imageAttribute = config.imageAttribute;
  const brandName = config.brandName;

  const cartItems = document.querySelectorAll(cartItemSelector);
  console.log('Cart items found:', cartItems.length); // Log the number of cart items found
  const cartData = [];

  cartItems.forEach(cartItem => {
    const nameElement = cartItem.querySelector(itemSelector);
    const name = nameElement ? nameElement.childNodes[0].textContent.trim() : 'Unknown';

    const imageElement = cartItem.querySelector(imageSelector);

    let imageUrl;
    if (imageElement) {
      if (imageAttribute === 'src') {
        imageUrl = imageElement.src;
      } else {
        const srcset = imageElement.getAttribute(imageAttribute);
        imageUrl = srcset ? srcset.split(' ')[0] : 'No image URL found';
      }
    } else {
      imageUrl = 'No image URL found';
    }

    const brand = brandName || 'Unknown';

    console.log('Item:', { name, brand, imageUrl }); // Log the extracted data

    // Add default values for favorite and categories
    cartData.push({ 
      name, 
      brand, 
      imageUrl, 
      favorite: false, // default value 
      categories: [] // default empty array 
    });
  });

  return cartData;
}

function convertToCSV(data) {
  const header = ['Name', 'Brand', 'Image URL', 'Favorite', 'Categories'];
  const rows = data.map(item => [
    item.name, 
    item.brand, 
    item.imageUrl, 
    item.favorite, 
    item.categories.join(';') // Join categories array to a single string separated by semicolons
  ]);

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
