// import stuff
import { LitElement, html, css } from "lit";

export class TvChannel extends LitElement {
  // defaults
  constructor() {
    super();
    this.title = "";
    this.presenter = "";
    this.id = "";
  }
  // convention I enjoy using to define the tag's name
  static get tag() {
    return "tv-channel";
  }
  // LitElement convention so we update render() when values change
  static get properties() {
    return {
      title: { type: String },
      presenter: { type: String },
      id: { type: String },
    };
  }
  // LitElement convention for applying styles JUST to our element
  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }
      .wrapper {
        background-color: #eeeeee;
        width: 100%;
        max-width: 400px;
        margin: 8px auto;
        border-radius: 10px;
        box-shadow: 1px 1px 5px grey;
        padding: 10px;
        box-sizing: border-box;
        height: 50px;
        display: flex;
        justify-content: space-between;
        overflow: hidden; /* Prevent text overflow */
        align-items: center;
      }

      
    `;
  }
  // LitElement rendering template of your element
  render() {
    return html`
      <div class="wrapper">
        <div> <h3>${this.id}</h3> </div>
        
        <div> <h3>${this.title}</h3> </div>

        <!-- <h4>${this.presenter}</h4> -->
        <slot></slot>
      </div>
    `;
  }
}
// tell the browser about our tag and class it should run when it sees it
customElements.define(TvChannel.tag, TvChannel);
