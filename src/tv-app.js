// import stuff
import { LitElement, html, css } from "lit";
import "@shoelace-style/shoelace/dist/components/dialog/dialog.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "./tv-channel.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export class TvApp extends LitElement {
  // defaults
  constructor() {
    super();
    this.name = "";
    this.source = new URL("../assets/channels.json", import.meta.url).href;
    this.listings = [];
    this.id = "";
    this.contents = Array(9).fill("");
    this.currentPage = 0;
    this.selectedCourse = null;
    this.activeIndex = null; // To keep track of the active index
    this.activeContent = ""; // To store the active content HTML
    this.itemClick = this.itemClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.contents.forEach((_, index) => {
      this.loadContent(index);
    });
  }

  // convention I enjoy using to define the tag's name
  static get tag() {
    return "tv-app";
  }
  // LitElement convention so we update render() when values change
  static get properties() {
    return {
      name: { type: String },
      source: { type: String },
      listings: { type: Array },
      selectedCourse: { type: Object },
      currentPage: { type: Number },
      contents: { type: Array },
      id: { type: String },
      activeIndex: { type: Number },
      activeContent: { type: String },
    };
  }
  // LitElement convention for applying styles JUST to our element
  static get styles() {
    return [
      css`
        :host {
          display: block;
          margin: 16px;
          padding: 16px;
        }

        .alignContent {
        display: flex;
        justify-content: flex-start;
        gap: 90px; /* Optional: adjust the gap between course topics and main content */
      }

        .course-topics {
          display: flex;
    flex-direction: column;
    width: 275px;
    margin-right: 1px;
    margin-top: 40px;
    position: fixed;
    padding-top: 10px;
    padding-right: 5px;

}

.main {
    margin-left: 358px;
    margin-top: 40px;
    flex: 1 1 0%;
    overflow-y: auto;
    padding: 42px;
    
    border: 1px solid #dadce0;
    border-radius: 5px;
    width: calc(100% - 350px);
    max-width: calc(100% - 350px);


  
       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add box shadow to the right */
       background-color: #f8f9fa; /* Keep the same background color */

       font-size: 1.3em;
    
     
  

       --devsite-code-font-family: Roboto Mono, monospace;
       --devsite-primary-font-family: Roboto, Noto Sans, Noto Sans JP,
         Noto Sans KR, Noto Naskh Arabic, Noto Sans Thai, Noto Sans Hebrew,
         Noto Sans Bengali, sans-serif;
       --devsite-h3-margin: 32px 0 16px;
       --devsite-h4-font: 500 16px/24px var(--devsite-primary-font-family);
      
       font: 400 16px/24px var(--devsite-primary-font-family);
       -webkit-font-smoothing: antialiased;
       text-size-adjust: 100%;
       color: #4e5256;
       font-family: var(--devsite-primary-font-family);
       background: #f8f9fa;
}

       
      `,
    ];
  }

  render() {
    return html`
      <div class="alignContent">
        <div class="course-topics">
          ${this.listings.map(
            (item, index) => html`
              <tv-channel
                title="${item.title}"
                presenter="${item.metadata.author}"
                id="${item.id}"
                @click="${() => this.itemClick(index)}"
              >
              </tv-channel>
            `,
          )}
        </div>

        <div class="main">
          ${this.activeContent ? unsafeHTML(this.activeContent) : html``}
          <div>
            <button @click=${() => this.prevPage()}>PREV</button>
            <button @click=${() => this.nextPage()}>NEXT</button>
          </div>
        </div>
      </div>
    `;
  }
  closeDialog(e) {
    const dialog = this.shadowRoot.querySelector(".dialog");
    dialog.hide();
  }

  async nextPage() {
    if (this.activeIndex !== null) {
      const nextIndex = (this.activeIndex + 1) % this.listings.length;
      const item = this.listings[nextIndex].location;

      const contentPath = "/assets/" + item;

      try {
        const response = await fetch(contentPath);
        this.activeContent = await response.text();
        console.log("Active Content", this.activeContent);
        this.activeIndex = nextIndex; // Update the active index after fetching content
      } catch (err) {
        console.log("fetch failed", err);
      }
    }
  }

  async prevPage() {
    if (this.activeIndex !== null) {
      const prevIndex =
        this.activeIndex === 0
          ? this.listings.length - 1
          : this.activeIndex - 1;
      const item = this.listings[prevIndex].location;

      const contentPath = "/assets/" + item;

      try {
        const response = await fetch(contentPath);
        this.activeContent = await response.text();
        console.log("Active Content", this.activeContent);
        this.activeIndex = prevIndex; // Update the active index after fetching content
      } catch (err) {
        console.log("fetch failed", err);
      }
    }
  }

  async itemClick(index) {
    this.activeIndex = index;
    const item = this.listings[index].location;
    console.log("Active Content", item);

    const contentPath = "/assets/" + item;
    console.log("Content Path", contentPath);

    try {
      const response = await fetch(contentPath);
      const text = await response.text();
      this.activeContent = text;
      console.log("Active Content", this.activeContent);
    } catch (err) {
      console.log("fetch failed", err);
    }

    // const dialog = this.shadowRoot.querySelector('.dialog');
    // dialog.show();
  }

  // LitElement life cycle for when any property changes
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "source" && this[propName]) {
        this.updateSourceData(this[propName]);
      }
    });
  }

  async updateSourceData(source) {
    await fetch(source)
      .then((resp) => (resp.ok ? resp.json() : []))
      .then((responseData) => {
        if (
          responseData.status === 200 &&
          responseData.data.items &&
          responseData.data.items.length > 0
        ) {
          this.listings = [...responseData.data.items];
        }
      });
  }
}
// tell the browser about our tag and class it should run when it sees it
customElements.define(TvApp.tag, TvApp);
