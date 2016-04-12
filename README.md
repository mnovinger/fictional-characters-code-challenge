# Fictional  Characters - Code Challenge
This simple app generates humorous descriptions of fictional characters that you might incorporate into your next novel or film project.
Descriptions are random combinations of "terms" such as names, nouns and adjectives.

## Example Output
> My idol has got to be... Camila Cansler, the delusional helicopter pilot who was raised by wolves

or perhaps...

> The movie is about... Marianela Masker, the time-traveling steeplechase olympian who isn't quite sure what year it is

or even...

> The play explores the life of... My unreasonably gullible lederhosen designer, Christia Chirico

## Your Mission
There are some issues with the code, preventing this app from reaching true greatness.
Please try to make progress on as many of the tasks below as you can.
You may use the internet for help, and anyone in the room who may be able to provide a hint.

## Getting started
1. `git clone` this repo.
1. Run `npm install` to install dependencies.
1. Run `npm run server` to auto-build the project when any changes are made.
1. Open `http://localhost:8080/` to use the project.

## Intended Use
When the page loads, a randomly-generated character description is shown.
Clicking on an individual term in the description will cause that term to be randomly changed.
You can also click the "intro" string above the description to change it.
Clicking on the `ANOTHER!` button will re-render the entire description and intro string, potentially switching to a different sentence pattern each time.

## Tasks
1. Discover where the terms are stored, and add some of your own.
1. The first term in the sentence pattern is not getting rendered to the page. Please fix!
1. The intro string is clickable but doesn't change its appearance on mouseover. Please update the style by referencing the same style definition used within the description.
1. Clicking the `ANOTHER!` button does not re-render a new character description as intended. Please add this feature without causing the page to be refreshed.
1. With the `ANOTHER!` button rendering an entirely new character description, it doesn't ever change its sentence pattern. Please fix!
1. Some terms are defined with a suffix of `,` or `...`, which is not getting rendered. Use the `TermGetter`'s promise chain to include this step. Part of the code already exists.
1. The name term is defined with an `upperCase` modifier. Like above, create an upper-casing function and include it in the same promise chain so that names will render in all-caps.

### Have fun!
