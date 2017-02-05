import { sample } from 'lodash'

import FragmentFetcher from './fragmentFetcher'

require('./app.less')

const TEMPLATE = require('./app.jade')

const INTRO             = new FragmentFetcher('intros', { suffix: '...' })
const NAME              = new FragmentFetcher('names', { allCaps: true })
const NAME_WITH_COMMA   = new FragmentFetcher('names', { suffix: ',', allCaps: true })
const ADJ               = new FragmentFetcher('adjectives')
const NOUN              = new FragmentFetcher('nouns')
const QUIRK             = new FragmentFetcher('quirks')
const QUIRK_WITH_COMMA  = new FragmentFetcher('quirks', { suffix: ',' })

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

  _getFragmentResolver(patternItem) {
    if (patternItem instanceof FragmentFetcher) {
      return patternItem.fetch()
    } else if (Array.isArray(patternItem)) {
      return Promise.resolve(sample(patternItem))
    } else {  // assume string
      return Promise.resolve(patternItem)
    }
  }

  _renderFragment(fragmentElement, fragmentText) {
    fragmentElement.textContent = fragmentText
  }

  /**
   * Render the whole app element and attach event handlers.
   */
  _renderAll() {
    const templateParams = { numFragments: this._sentence_structure_pattern.length }
    this._containerElement.innerHTML = TEMPLATE(templateParams)

    const introElement = this._containerElement.querySelector('.intro')
    INTRO.fetch().then((intro) => {
      introElement.textContent = intro
    })
    introElement.addEventListener('click', (evt) => {
      this._getFragmentResolver(INTRO)
        .then((fragmentText) => {
          this._renderFragment(evt.target, fragmentText)
        })
    })

    this._sentence_structure_pattern.forEach((patternItem, i) => {
      const fragmentElement = this._containerElement.querySelector(`.fragment[fragment-index='${ i }']`)
      if (fragmentElement) {
        fragmentElement.addEventListener('click', this._changeFragmentHandler.bind(this))
        this._getFragmentResolver(patternItem)
          .then((fragmentText) => {
            this._renderFragment(fragmentElement, fragmentText)
          })
      }
    })

  }

  _changeFragmentHandler(evt) {
    const patternItem = this._sentence_structure_pattern[evt.target.getAttribute('fragment-index')]
    this._getFragmentResolver(patternItem)
      .then((fragmentText) => {
        this._renderFragment(evt.target, fragmentText)
      })
  }

}

export default App
