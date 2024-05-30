const siteConfig = {
    "www.urbanoutfitters.com": {
      cartItemSelector: ".c-pwa-cart-item",
      itemSelector: ".c-pwa-item-title a",
      imageSelector: ".c-pwa-cart-image img.o-pwa-item-thumbnail__image",
      imageAttribute: 'src',
      removeSelectors: ["span.c-pwa-screen-reader-only"],
      brandName: "Urban Outfitters"
    },
    "shop.lululemon.com": {
      cartItemSelector: "article.product_product__MKVKh",
      itemSelector: "button.product_titleButton__e6Iao",
      imageSelector: 'img[data-lulu-attributes][data-testid="not-lazy-image"]',
      imageAttribute: 'srcset',
      removeSelectors: [],
      brandName: "Lululemon"
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
  