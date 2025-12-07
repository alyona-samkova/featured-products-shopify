/**
 * Custom Element: Featured Products Section
 * ------------------------------------------------------------------------------
 * Manages the featured products section. It listens for global cart update events
 * via PubSub and refreshes the section content using the Section Rendering API
 * to exclude products that have already been added to the cart.
 *
 * @extends HTMLElement
 */
class FeaturedProductsSection extends HTMLElement {
  constructor() {
    super();
    /** @type {Function|null} Stores the unsubscribe function for PubSub events */
    this.unsubscribe = null;
  }

  /**
   * Called when the element is added to the DOM.
   * Initializes the section ID and waits for the environment dependencies.
   */
  connectedCallback() {
    this.sectionId = this.dataset.sectionId;

    customElements.whenDefined('product-form').then(() => {
      this.initSubscription();
    });
  }

  /**
   * Called when the element is removed from the DOM.
   * Cleans up subscriptions to prevent memory leaks.
   */
  disconnectedCallback() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  /**
   * Subscribes to the global cart update event.
   */
  initSubscription() {
    if (typeof subscribe === 'undefined') return;

    this.unsubscribe = subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
      this.onCartUpdate(event);
    });
  }

  /**
   * Handles the cart update event.
   * Initiates a request to refresh the section HTML.
   *
   * @param {Object} event - The cart update event object.
   */
  onCartUpdate(event) {
    const url = `${window.location.pathname}?section_id=${this.sectionId}`;

    this.style.opacity = '0.5';
    this.style.pointerEvents = 'none';

    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        this.renderContents(responseText);
      })
      .catch((e) => {
        console.error('Featured Products Refresh Error:', e);
      })
      .finally(() => {
        this.style.opacity = '1';
        this.style.pointerEvents = 'auto';
      });
  }

  /**
   * Parses the fetched HTML string and updates the DOM elements.
   * Logic conforms to the standard Shopify 'renderContents' pattern.
   *
   * @param {string} htmlString - The raw HTML response from the server.
   */
  renderContents(htmlString) {
    const parsedHTML = new DOMParser().parseFromString(htmlString, 'text/html');

    this.getSectionsToRender().forEach((section) => {
      const elementToReplace = document.querySelector(section.selector);

      if (elementToReplace) {
        const newContent = this.getSectionInnerHTML(parsedHTML, section.selector);

        if (newContent) {
          elementToReplace.innerHTML = newContent;

          const newContainer = parsedHTML.querySelector(section.selector);
          if (newContainer) {
            elementToReplace.className = newContainer.className;
          }
        }
      }
    });
  }

  /**
   * Defines which sections of the DOM need to be re-rendered.
   *
   * @returns {Array<{id: string, selector: string}>} Array of objects with IDs and selectors.
   */
  getSectionsToRender() {
    return [
      {
        id: this.sectionId,
        selector: `featured-products-section[data-section-id="${this.sectionId}"]`,
      },
    ];
  }

  /**
   * Utility method to extract the inner HTML of a specific element from a parsed document.
   *
   * @param {Document} htmlDocument - The parsed HTML document.
   * @param {string} selector - The CSS selector to find the element.
   * @returns {string|null} The innerHTML of the found element, or null if not found.
   */
  getSectionInnerHTML(htmlDocument, selector) {
    const element = htmlDocument.querySelector(selector);
    return element ? element.innerHTML : null;
  }
}

customElements.define('featured-products-section', FeaturedProductsSection);
