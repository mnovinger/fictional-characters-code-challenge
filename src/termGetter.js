import config from './config'

class TermGetter {

  constructor(type, { suffix = '', upperCase = false } = {}) {
    this._type        = type
    this._suffix      = suffix
    this._upperCase   = upperCase
    this._termServer  = new config.termServerClass()
  }

  get() {
    const addSuffix = (term) => `${ term }${ this._suffix }`
    return this._termServer.get(this._type)
  }

}

export default TermGetter
