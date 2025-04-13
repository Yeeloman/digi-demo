// src/defaults.ts
var DEFAULTS = {
  STYLES: {
    container: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(10px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "1000"
    },
    content: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      width: "80%",
      maxWidth: "80%",
      position: "relative"
    },
    iframe: {
      width: "100%",
      height: "80vh",
      border: "none",
      borderRadius: "4px"
    }
  },
  SANDBOX: "allow-scripts allow-same-origin"
};

// src/index.ts
var ModalPopup = class {
  // private flags: Set<string>;
  constructor(cfg) {
    this.modalUrl = cfg.url || null;
    this.onClose = cfg.onClose || (() => {
    });
    this.onOpen = cfg.onOpen || (() => {
    });
    this.modalElementMap = /* @__PURE__ */ new WeakMap();
    this.cfg = cfg;
    function debounce(func, wait) {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      window.addEventListener(
        "beforeunload",
        debounce(() => {
          window.closePopup?.();
        }, 300),
        { once: true }
      );
    }
  }
  // private handleMessage(event: MessageEvent): void {
  //     try {
  //         if (this.flags.has(event.data)) {
  //             this.closePopup();
  //         }
  //     } catch (err) {
  //         console.error('Error handling message event:', err);
  //     }
  // }
  /**
   * Constructs a URL by replacing path parameters and appending query parameters.
   *
   * @param pathParams - An object containing key-value pairs to replace path placeholders in the URL.
   * @param queryParams - An object containing key-value pairs to be appended as query parameters.
   * @returns The constructed URL with path and query parameters.
   * @throws Error if the base URL is not set.
   */
  buildUrl(pathParams, queryParams) {
    if (!this.modalUrl) {
      throw new Error("URL is required.");
    }
    const validateParams = (params2) => {
      for (const value of Object.values(params2)) {
        if (/[^a-zA-Z0-9-_]/.test(value)) {
          throw new Error("Invalid characters in URL parameters.");
        }
      }
    };
    validateParams(pathParams);
    validateParams(queryParams);
    let url = this.modalUrl;
    for (const [key, value] of Object.entries(pathParams)) {
      url = url.replace(`:${key}`, value);
    }
    const params = new URLSearchParams(queryParams);
    return `${url}?${params.toString()}`;
  }
  /**
   * Opens a modal popup by constructing a URL with the given path and query parameters.
   * If a modal is already open, it logs a warning and exits.
   * Throws an error if executed outside a browser environment.
   *
   * @param pathParams - An object containing key-value pairs to replace path placeholders in the URL.
   * @param queryParams - An object containing key-value pairs to be appended as query parameters.
   * @throws Error if not in a browser environment.
   */
  openPopup(pathParams = {}, queryParams = {}) {
    try {
      if (typeof window === "undefined" || typeof document === "undefined") {
        throw new Error("ModalPopup can only be used in a browser environment.");
      }
      if (this.modalElementMap.has(this)) {
        console.warn("A modal is already open.");
        return;
      }
      const url = this.buildUrl(pathParams, queryParams);
      const modalElement = this.createModalElement(url);
      this.modalElementMap.set(this, modalElement);
      document.body.appendChild(modalElement);
      this.onOpen();
    } catch (error) {
      console.error("Failed to open popup:", error);
    }
  }
  /**
   * Closes the currently open modal popup by removing it from the DOM.
   * Sets the modal element to null and triggers the onClose callback.
   */
  closePopup() {
    const modalElement = this.modalElementMap.get(this);
    if (modalElement) {
      document.body.removeChild(modalElement);
      this.modalElementMap.delete(this);
    } else {
      console.warn("No modal found for this instance.");
    }
    this.onClose();
  }
  /**
   * Represents a modal popup that can be opened and closed within a browser environment.
   * The modal is configured using a `ModalPopupConfig` object, which specifies the URL,
   * callbacks for open and close events, and optional styles. The modal content is loaded
   * in an iframe, and the modal can be closed by clicking outside the content or on a close button.
   * 
   * The class ensures that only one modal is open at a time and provides methods to build
   * URLs with path and query parameters. It also handles cleanup before page reload.
   */
  applyStyles(element, styles) {
    for (const [key, value] of Object.entries(styles)) {
      element.style[key] = value;
    }
  }
  /**
   * Creates and returns a modal element containing an iframe with the specified URL.
   * The modal includes a close button and is styled to cover the entire viewport.
   * Clicking outside the modal content or on the close button will close the modal.
   *
   * @param url - The URL to be loaded in the iframe within the modal.
   * @returns The constructed modal container element.
   */
  createModalElement(url) {
    const containerStyles = Object.assign({}, DEFAULTS.STYLES.container, this.cfg.styles?.container);
    const contentStyles = Object.assign({}, DEFAULTS.STYLES.content, this.cfg.styles?.content);
    const iframeStyles = Object.assign({}, DEFAULTS.STYLES.iframe, this.cfg.styles?.iframe);
    const modalContainer = document.createElement("div");
    this.applyStyles(modalContainer, containerStyles);
    const modalContent = document.createElement("div");
    this.applyStyles(modalContent, contentStyles);
    const closeButton = document.createElement("button");
    closeButton.textContent = "\xD7";
    closeButton.style.cssText = `
            position: absolute !important;
            top: 10px !important;
            right: 10px !important;
            background: none !important;
            border: none !important;
            font-size: 20px !important;
            cursor: pointer !important;
        `;
    closeButton.setAttribute("aria-label", "Close");
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.setAttribute("sandbox", this.cfg.sandbox || DEFAULTS.SANDBOX);
    this.applyStyles(iframe, iframeStyles);
    iframe.addEventListener("error", () => {
      const errorMessage = document.createElement("div");
      errorMessage.textContent = "Failed to load content.";
      modalContent.appendChild(errorMessage);
      console.error("Failed to load iframe content from URL:", url);
    });
    modalContent.appendChild(closeButton);
    modalContent.appendChild(iframe);
    modalContainer.appendChild(modalContent);
    modalContainer.addEventListener("click", (event) => {
      if (event.target === modalContainer) {
        this.closePopup();
      }
    });
    closeButton.addEventListener("click", () => this.closePopup());
    return modalContainer;
  }
};
function createModalPopup(config) {
  return new ModalPopup(config);
}
export {
  createModalPopup
};
