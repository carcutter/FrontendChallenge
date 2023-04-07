import Style from "./style";
import BrowserHelper from "../../helpers/browser-helper";
import CustomElement from "../../core/custom-element";

export default class FrontendChallengeSlider extends CustomElement {
  //- TAG --------------------------------------------------------------------------------------------------------------
  public static readonly TAG: string = "frontend-challenge-slider";
  public static create(): FrontendChallengeSlider {
    return document.createElement(FrontendChallengeSlider.TAG) as FrontendChallengeSlider;
  }

  //- Members ----------------------------------------------------------------------------------------------------------
  public isMobile = BrowserHelper.isBrowserMobile();

  //- Constructor ------------------------------------------------------------------------------------------------------
  constructor() {
    super();
  }

  //- HTMLElemet interface implementation ------------------------------------------------------------------------------
  connectedCallback() {
    // Apply adopted style sheets found in 'style.module.css'
    this.applyAdoptedStyleSheets(Style);

    // TODO Add your implementation here

    // Append HTML content
    const replaceMe = document.createElement("div");
    replaceMe.innerHTML = "CarCutter Frontend Challenge Slider";
    replaceMe.classList.add("replace-me");
    this.appendToShadowRoot(replaceMe);
  }

  disconnectedCallback() {}

  adoptedCallback() {}

  attributeChangedCallback(name: string, prev: string, value: string) {}

  static get observedAttributes() {
    return [];
  }
}

customElements.define(FrontendChallengeSlider.TAG, FrontendChallengeSlider);
