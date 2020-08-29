import { html, css, LitElement } from 'lit-element';
import calendar from './calendar.js';

const CURRENT_TRIMESTER = '3205';

export class TrimesterDate extends LitElement {
/*  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--trimester-date-text-color, #000);
      }
    `;
  }*/

  static get properties() {
    return {
      trimester: { type: String },
      counter: { type: Number },
    };
  }

  constructor() {
    super();
    this.trimester = CURRENT_TRIMESTER;
    this.counter = 5;
    console.log("hello there");
    console.log(this.innerHTML);
    console.log(calendar);
    console.log(window.location.href);

    this.parseDate();
  }

  render() {
    //return html`<span class="trimester-date">${this.innerHTML} (${this.dateString})</span>`;
    return html`${this.innerHTML} (${this.dateString})`;
  }

  parseDate() {
    let dateText = this.innerHTML;

    // extract the day and week
    // Wednesday Week 5 becomes
    // - day = Wednesday
    // - week = 5
    // and convert it to a date string
    //  date = March 12, 2019
    let day = '', week = '', date = '';
    let m = dateText.match(
      /.*\b(((mon|tues|wed(nes)?|thur(s)?|fri|sat(ur)?|sun)(day)?))\b[,]*[ ]*week *\b([0-9]*)/i);
    if (m) {
      // TODO need to convert the short days to long days?
      day = m[1];
      week = m[m.length - 1];
      date = this.getTermDate(week, day);
    } else {
      // couldn't match the date, finish up
      return false;
    }
  }

  //*********************
  // getTermDate( week, day )
  // - given a week and a day of Griffith semester return actual
  //   date for matching that study period
  // - weeks start on Monday
  getTermDate(week, dayOfWeek='Monday') {
    dayOfWeek = dayOfWeek.toLowerCase();
    let start;

    // if the week is not within the term return empty string
    if (typeof calendar[this.trimester][week] === 'undefined') {
        return "";
    }

    // else calculate the date and generate usable string
    start = calendar[this.trimester][week].start;
    var d = new Date(start);

    // if dayOfWeek is not Monday, add some days to the start of the week
    if (dayOfWeek !== 'monday') {
        var dayToNum = { 'tuesday': 1, 'wednesday': 2, 'thursday': 3, 'friday': 4, 'saturday': 5, 'sunday': 6 };
        if (dayOfWeek in dayToNum) {
            d.setDate(d.getDate() + dayToNum[dayOfWeek.toLowerCase()]);
        }
    }
    // generate string from date with given options
    const options = { weekday: undefined, year: 'numeric', month: 'long', day: 'numeric' };
    this.dateString = d.toLocaleDateString(undefined, options);
  }
}

customElements.define('trimester-date', TrimesterDate);
