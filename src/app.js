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

// Each sentence pattern is an array where each array item may be a string, an
// array of strings, or a fetcher object that can asynchronously get a bit of
// text of a requested type.
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
    } else {  // assume item is a string
      return Promise.resolve(patternItem)
    }
  }

  _fetchAndRenderFragment(patternItem, fragmentElement) {
    return this._getFragmentResolver(patternItem)
      .then((fragmentText) => {
        fragmentElement.textContent = fragmentText
      })
  }

  _initIntroElement() {
    const introElement = this._containerElement.querySelector('.intro')
    introElement.addEventListener('click', (evt) => {
      this._fetchAndRenderFragment(INTRO, evt.target)
    })
    return this._fetchAndRenderFragment(INTRO, introElement)
  }

  _initSentence() {
    return this._sentence_structure_pattern.map((patternItem, i) => {
      const fragmentElement = this._containerElement.querySelector(`.fragment[fragment-index='${ i }']`)
      if (fragmentElement) {
        fragmentElement.addEventListener('click', (evt) => {
          this._fetchAndRenderFragment(patternItem, evt.target)
        })
        return this._fetchAndRenderFragment(patternItem, fragmentElement)
      }
    })
  }

  /**
   * Reset CSS animation.
   */
  _resetRevealAnimation() {
    this._containerElement.classList.add('hidden')
  }

  /**
   * Trigger CSS animation by making sure the class changes after the page has
   * been rendered.
   */
  _triggerRevealAnimation() {
    requestAnimationFrame(() => {
      this._containerElement.classList.remove('hidden')
    })
  }

  /**
   * Render the whole app element and attach event handlers.
   */
  _renderAll() {
    this._resetRevealAnimation()

    const templateParams = { numFragments: this._sentence_structure_pattern.length }
    this._containerElement.innerHTML = TEMPLATE(templateParams)

    Promise.all([
      this._initIntroElement(),
      this._initSentence()
    ]).then(this._triggerRevealAnimation.bind(this))
  }

}

export default App
