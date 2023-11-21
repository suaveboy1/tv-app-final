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
        display: block;
        /* margin: 16px;
        padding: 16px; */
        
      }
      .wrapper {
        /* background-color: #eeeeee;
        width: 100%;
        margin-bottom: 8px;
        border-radius: 10px;
        box-shadow: 1px 1px 5px grey;
        margin-right: 3px;
        margin-left: 3px;
        margin-top: 3px;
        height: 50px;
        display: flex;
        align-items: center; */

        text-decoration: none;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 14px;
    color: #80868b;
    padding: 3px 10px;
    min-height: 48px;
    font-weight: 400;
    line-height: 20px;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    position: relative;
    font-family: Roboto,Noto,sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    border: 1px solid #dadce0;
    border-radius: 5px;
    margin: 6px 0;
    background-color:rgb(255 255 255);

      }

      #title{
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
    background-color: rgb(128 134 140);
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
        <span id = "title" >${this.title}</span>
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