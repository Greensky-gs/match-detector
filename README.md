
# match-detector

Source code of match-detector npm package using easy-json-database

## Usage

Import the detector and create a new MatchDetector

```js
const { MatchDetector } = require('match-detector');

const detector = new MatchDetector('./database.json');
```

And use `<#MatchDetector>.addElement({ word: 'any word or sentence', power: number between 1 and 10 })` to add an element

Use `<#MatchDetector>.removeElement('any word or sentence')` to remove an element

Use `<#MatchDetector>.test('content')` to test if the content matches the detector

## Important

As all ai, the most datas you give, the most precise it will be.

## Contact

Contact me on [this discord server](https://discord.gg/fHyN5w84g6)
