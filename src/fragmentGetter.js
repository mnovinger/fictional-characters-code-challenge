import config from './config'

class FragmentGetter {

  constructor(type, { suffix = '', allCaps = false } = {}) {
    this._type        = type
    this._suffix      = suffix
    this._allCaps     = allCaps
    this._server      = new config.serverClass()
  }

  get() {
    const addSuffix = (fragmentText) => `${ fragmentText }${ this._suffix }`
    return this._server.get(this._type)
  }

}

export default FragmentGetter
