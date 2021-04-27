import { html, css, LitElement } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map.js';

export class UserStory extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        --border-radius: 3ch;
        --width: 320px;
        --height: 568px;
        --outset-offset: 1.5rem;
      }

      .stories {
        display: grid;
        grid: 1fr / auto-flow 100%;
        gap: 1ch;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        overscroll-behavior-x: contain;
        width: var(--width);
        height: var(--height);
        border-radius: var(--border-radius);
        outline-offset: var(--outset-offset);

        box-shadow: 0 5px 2.5px hsl(200 95% 3% / 0.037),
          0 12px 6.5px hsl(200 95% 3% / 0.053),
          0 22.5px 13px hsl(200 95% 3% / 0.065),
          0 40.2px 24px hsl(200 95% 3% / 0.077),
          0 75.2px 44px hsl(200 95% 3% / 0.093),
          0 180px 80px hsl(200 95% 3% / 0.13);
      }

      .user {
        scroll-snap-align: start;
        scroll-snap-stop: always;

        display: grid;
        grid: [story] 1fr / [story] 1fr;
      }

      .story {
        grid-area: story;

        background-size: cover;
        background-image: var(--bg),
          linear-gradient(to top, rgb(249, 249, 249), rgb(226, 226, 226));
        user-select: none;
        touch-action: manipulation;
        transition: opacity 0.2s ease-in-out;
      }

      .story.seen {
        opacity: 0;
        pointer-events: none;
      }
    `;
  }

  static get properties() {
    return {
      stories: { type: Array },
    };
  }

  constructor() {
    super();
    this.state = {
      currentStory: null,
      median: 0,
    };
    this.stories = [];
  }

  updated() {
    const stories = this.shadowRoot.querySelector('.stories');
    const firstUserElement = stories.querySelector('.user');
    this.state = {
      currentStory: firstUserElement && firstUserElement.lastElementChild,
      median: stories.offsetLeft + stories.clientWidth / 2,
    };
  }

  navigateStories(direction) {
    const { currentStory: story } = this.state;
    const curParentElement = story.parentElement;
    const lastInUserStory = curParentElement.firstElementChild;
    const firstInUserStory = curParentElement.lastElementChild;
    const nextStory = curParentElement.nextElementSibling;
    const prevStory = curParentElement.previousElementSibling;

    if (direction === 'next') {
      if (lastInUserStory === story && !nextStory) return;

      if (lastInUserStory === story && nextStory) {
        this.state = {
          ...this.state,
          currentStory: nextStory.lastElementChild,
        };
        nextStory.scrollIntoView({ behavior: 'smooth' });
      } else {
        story.classList.add('seen');
        this.state = {
          ...this.state,
          currentStory: story.previousElementSibling,
        };
      }
    } else if (direction === 'prev') {
      if (firstInUserStory === story && !prevStory) return;

      if (firstInUserStory === story && prevStory) {
        this.state = {
          ...this.state,
          currentStory: prevStory.firstElementChild,
        };
        prevStory.scrollIntoView({ behavior: 'smooth' });
      } else {
        story.nextElementSibling.classList.remove('seen');
        this.state = {
          ...this.state,
          currentStory: story.nextElementSibling,
        };
      }
    }
  }

  clickNavigate(evt) {
    if (evt.target.nodeName !== 'ARTICLE') return;

    const { median } = this.state;
    this.navigateStories(evt.clientX > median ? 'next' : 'prev');
  }

  keyboardNavigate({ key }) {
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      const direction = key === 'ArrowDown' ? 'next' : 'prev';
      this.navigateStories(direction);
    }
  }

  render() {
    return html`
      <div
        tabindex="0"
        class="stories"
        @click="${this.clickNavigate}"
        @keydown="${this.keyboardNavigate}"
      >
        ${this.stories.map(
          usr => html`
            <section class="user">
              ${usr.updates.map(
                update => html`
                  <article
                    class="story"
                    style=${styleMap({ '--bg': `url(${update})` })}
                  ></article>
                `
              )}
            </section>
          `
        )}
      </div>
    `;
  }
}
