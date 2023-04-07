export default abstract class CustomElement extends HTMLElement {

  getShadowRoot(): ShadowRoot | null {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }
    return this.shadowRoot;
  }

  appendToShadowRoot<T extends Node>(element: T): boolean {
    if (!element) return false;
    const shadowRoot = this.getShadowRoot();
    if (!shadowRoot) return false;
    shadowRoot.appendChild(element);
    return true;
  }

  applyAdoptedStyleSheets(style: CSSStyleSheet): boolean {
    if (!style) return false;
    const shadowRoot = this.getShadowRoot();
    if (!shadowRoot) return false;
    shadowRoot.adoptedStyleSheets = [style];
    return true;
  }
}