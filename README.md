# Fictional  Characters - Code Challenge
This app randomly generates a humorous sentence that describes a fictional character that you might incorporate into your next novel or film project.
Each description is a combination of random sentence "fragments" such as names, nouns, adjectives, and character quirks.

## Example Output
> My idol has got to be... Camila Cansler, the delusional helicopter pilot who was raised by wolves

or perhaps...

> The movie is about... Marianela Masker, the time-traveling steeplechase olympian who isn't quite sure what year it is

or even...

> The play explores the life of... My unreasonably gullible lederhosen designer from the lost city of Atlantis, Christia Chirico

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
Clicking on an individual fragment in the description will cause that fragment to be randomly changed.
You can also click the "intro" string above the description to change it.
Clicking on the `ANOTHER!` button will re-render the entire description and intro string, potentially switching to a different description pattern each time.

## Tasks
1. Discover where the sentence fragments are stored, and add some of your own.
1. Each description contains five fragments, and each fragment is rendered to its own page element. However, only four of the five elements are showing up on the page. Please fix!
1. The intro string is clickable but doesn't change its appearance on mouseover. Please update the style by referencing the same LESS mixin used within the description.
1. Clicking the `ANOTHER!` button does not re-render a new character description (and intro string) as intended. Please add this feature without causing the page to be refreshed.
1. With the `ANOTHER!` button randomizing an entirely new character description, it doesn't ever change its description pattern. The patterns should sometimes show the character's name first, and sometimes last. Please fix!
1. Some fragments are defined with a suffix of `,` or `...`, but that suffix is not getting rendered. Use the `FragmentFetcher`'s promise chain to include this step. Part of the code already exists.
1. The "name" fragment is defined with an `allCaps` modifier. Like above, create an upper-casing function and include it in the same promise chain so that names will render in all-caps.

### Have fun!
