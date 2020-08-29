# \<trimester-date>

Modifies the following
```html
<trimester-date>Tuesday, Week 3</trimester-date>
```

to include a specific date when displayed- e.g. ```Tuesday, Week 3 (28 July 2020)``` based on the calendar for a specific trimester.

## Current Status

This version 0 release is an initial foray into Web components. It has limitations, including (but not limited to)

- hard-coded to the calendar of a particular University;
- hard-coded default trimester;
- limited testing and validation; and,
- no automated detection of the trimester from the LMS course site.

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i trimester-date
```

## Usage
```html
<script type="module">
  import 'trimester-date/trimester-date.js';
</script>

<trimester-date>Monday, Week 5</trimester-date>
<trimester-date trimester="3201">Monday, Week 5</trimester-date>

```

Element content should be a generic day/week using this format
> *DayName*, Week *WeekNum*
where 

- *DayName* - is a partial (mon, tue, wed) or full (monday, tuesday, wednesday) name of the day - case insensitive
- *WeekNum* - an integer matching a week in the University trimester (study period)

The ```trimester``` attribute can be used to specify a particular trimester to use for date calculation. There is a default trimester hard-coded into the component.

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `es-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`
