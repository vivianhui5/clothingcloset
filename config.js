const siteConfig = {
    "www.urbanoutfitters.com": {
      itemSelector: ".c-pwa-item-title a",
      brandSelector: ".item-brand",
      imageSelector: ".c-pwa-cart-image img.o-pwa-item-thumbnail__image",
      brandName: "Urban Outfitters"
    },
    "shop.lululemon.com": {
      itemSelector: ".another-item-title a",
      brandSelector: ".another-brand",
      imageSelector: ".another-cart-image img.another-item-thumbnail__image",
      brandName: "Lulu Lemon"
    }
  };
  
  function getSiteConfig() {
    const hostname = window.location.hostname;
    console.log('Current hostname:', hostname); // Log the hostname to debug
    const config = siteConfig[hostname];
    if (!config) {
      console.log('No configuration found for hostname:', hostname); // Log if no config is found
    }
    return config || {};
  }
  
  window.siteConfig = siteConfig;
  window.getSiteConfig = getSiteConfig;
  