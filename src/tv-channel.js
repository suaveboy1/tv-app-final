// import stuff
import { LitElement, html, css } from 'lit';

export class TvChannel extends LitElement {
  // defaults
  constructor() {
    super();
    this.title = '';
    this.presenter = '';
    this.id = '';
  }
  // convention I enjoy using to define the tag's name
  static get tag() {
    return 'tv-channel';
  }
  // LitElement convention so we update render() when values change
  static get properties() {
    return {
      title: { type: String },
      presenter: { type: String },
      id: { type: String }
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
        margin-bottom: 8px;
        border-radius: 10px;
        box-shadow: 1px 1px 5px grey;
        margin-right: 3px;
        margin-left: 3px;
        margin-top: 3px;
        height: 50px;
        display: flex;
        align-items: center;

      }

      h3 {
        font-size: 12px;
        align-items: center;
        margin-left: 10px;
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 10px;
        font-weight: normal;
      }

      h2 {
        font-size: 15px;
        align-items: center;
        margin-left: 10px;
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 10px;
        color: white;
      }

      .dot {
        height: 25px;
        width: 25px;
        background-color: #3A3B3C;
        border-radius: 50%;
        margin: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
}


      @media (min-width: 800px) {
        /* h3{
          font-size: 18px;
        }

        h4 {
          font-size: 15px;
        } */

      /* .wrapper{
        max-width: auto;
        max-height: auto;
      } */
      }
    `;
  }
  // LitElement rendering template of your element
  render() {
    return html`
      <div class="wrapper">
        <span class="dot">
          <h2>${this.id}</h2>
        </span>
        <h3>${this.title}</h3>
        <slot></slot>
      </div>  
      `;
  }
}
// tell the browser about our tag and class it should run when it sees it
customElements.define(TvChannel.tag, TvChannel);

//         <h4>${this.presenter}</h4>

// h4 {
//   font-size: 12px;
//   justify-content: center;
//   margin-left: 10px;
//   margin-bottom: 5px;
//   margin-top: 5px;
//   margin-right: 10px;
// }