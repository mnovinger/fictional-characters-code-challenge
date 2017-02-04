import { sample } from 'lodash'

import FragmentGetter from './fragmentGetter'

require('./app.less')

const TEMPLATE = require('./app.jade')

const INTRO             = new FragmentGetter('intros', { suffix: '...' })
const NAME              = new FragmentGetter('names', { allCaps: true })
const NAME_WITH_COMMA   = new FragmentGetter('names', { suffix: ',', allCaps: true })
const ADJ               = new FragmentGetter('adjectives')
const NOUN              = new FragmentGetter('nouns')
const QUIRK             = new FragmentGetter('quirks')
const QUIRK_WITH_COMMA  = new FragmentGetter('quirks', { suffix: ',' })

const SENTENCE_STRUCTURE_PATTERNS = [
  [ NAME_WITH_COMMA, 'the', ADJ, NOUN, QUIRK ],
  [ [ 'The', 'My' ], ADJ, NOUN, QUIRK_WITH_COMMA, NAME ]
]

class App {

  constructor(containerElement) {
    this._containerElement = containerElement
    this._sentence_structure_pattern = sample(SENTENCE_STRUCTURE_PATTERNS)
    this._renderAll()
  }

  _renderFragment(getterOrArrayOrStr, fragmentElement) {
    if (getterOrArrayOrStr instanceof FragmentGetter) {
      getterOrArrayOrStr.get().then((fragmentText) => fragmentElement.textContent = fragmentText)
    } else if (Array.isArray(getterOrArrayOrStr)) {
      fragmentElement.textContent = sample(getterOrArrayOrStr)
    } else {  // assume string
      fragmentElement.textContent = getterOrArrayOrStr
    }
  }

  /**
   * Render the whole app element and attach event handlers.
   */
  _renderAll() {
    const templateParams = { numFragments: this._sentence_structure_pattern.length }
    this._containerElement.innerHTML = TEMPLATE(templateParams)

    const introElement = this._containerElement.querySelector('.intro')
    INTRO.get().then((intro) => {
      introElement.textContent = intro
    })
    introElement.addEventListener('click', (evt) => {
      this._renderFragment(INTRO, evt.target)
    })

    this._sentence_structure_pattern.forEach((getterOrArrayOrStr, i) => {
      const fragmentElement = this._containerElement.querySelector(`.fragment[fragment-index='${ i }']`)
      if (fragmentElement) {
        this._renderFragment(getterOrArrayOrStr, fragmentElement)
        fragmentElement.addEventListener('click', this._changeFragmentHandler.bind(this))
      }
    })

  }

  _changeFragmentHandler(evt) {
    this._renderFragment(this._sentence_structure_pattern[evt.target.getAttribute('fragment-index')], evt.target)
  }

}

export default App
