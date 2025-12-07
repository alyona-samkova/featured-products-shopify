# Featured Products Custom (Shopify)

This section provides a dynamic, customizable featured-products block for Shopify themes.  
It automatically hides products already added to the cart and refreshes itself using Shopify’s Section Rendering API and PubSub events.  
The system uses Liquid templates, a custom Web Component, SCSS compiled with Webpack, and Prettier for formatting.

## Technology

* **Shopify Liquid** – template engine for rendering products and sections
* **JavaScript (ES6+)** – custom element `<featured-products-section>`
* **Shopify PubSub** – listens for `cartUpdate` events
* **Section Rendering API** – fetches updated section HTML without full page reload
* **SCSS** – modular styles with responsive mixins
* **Webpack** – compiles SCSS into `featured-products.css`
* **Prettier** – code formatter
* **DOMParser API** – parsing partial HTML updates

## Setup

* Place `featured-products-custom.liquid` into your theme’s `sections/` directory
* Place `featured-product-card.liquid` into the `snippets/` directory
* Add `featured-products.js` and the compiled `featured-products.css` to your theme’s `assets/` folder
* Ensure your theme initializes Shopify’s `subscribe()` and `PUB_SUB_EVENTS` (most Online Store 2.0 themes have this by default)

### SCSS build

* Install dependencies:  
  `npm install`
* Compile SCSS using Webpack:  
  `npm run build:dev`
* Resulting file `featured-products.css` will be emitted into `assets/`

### Prettier formatting

* Format any file using:  
  `npm run prettier -- path/to/file --write`
