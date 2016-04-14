import TermGetter from './termGetter'

const TEMPLATE = require('./app.jade')

const INTRO             = new TermGetter('intros', { suffix: '...' })
const NAME              = new TermGetter('names', { upperCase: true })
const NAME_WITH_COMMA   = new TermGetter('names', { suffix: ',', upperCase: true })
const ADJ               = new TermGetter('adjectives')
const NOUN              = new TermGetter('nouns')
const QUIRK             = new TermGetter('quirks')
const QUIRK_WITH_COMMA  = new TermGetter('quirks', { suffix: ',' })

const PATTERNS = [
  [ NAME_WITH_COMMA, 'the', ADJ, NOUN, QUIRK ],
  [ [ 'The', 'My' ], ADJ, NOUN, QUIRK_WITH_COMMA, NAME ]
]

class FictionalCharacterGenerator {

  constructor(container) {
    this._container = container
    this._pattern = PATTERNS.sample()
    this._render()
  }

  _renderTerm(getterOrArrayOrStr, termElement) {
    if (getterOrArrayOrStr instanceof TermGetter) {
      getterOrArrayOrStr.get().then((term) => termElement.textContent = term)
    } else if (Array.isArray(getterOrArrayOrStr)) {
      termElement.textContent = getterOrArrayOrStr.sample()
    } else {  // assume string
      termElement.textContent = getterOrArrayOrStr
    }
  }

  _render() {
    
    this._container.innerHTML = TEMPLATE({ num: this._pattern.length })

    const introContainer = this._container.querySelector('.intro')
    INTRO.get().then((intro) => introContainer.textContent = intro)
    introContainer.addEventListener('click', (evt) => {
      this._renderTerm(INTRO, evt.target)
    })

    this._pattern.forEach((getterOrArrayOrStr, i) => {
      const termElement = this._container.querySelector(`.term[term-index='${ i }']`)
      if (termElement) {
        this._renderTerm(getterOrArrayOrStr, termElement)
        termElement.addEventListener('click', this._changeHandler.bind(this))
      }
    })

  }

  _changeHandler(evt) {
    this._renderTerm(this._pattern[evt.target.getAttribute('term-index')], evt.target)
  }

}

export default FictionalCharacterGenerator
