import config from './config'

class FragmentFetcher {

  constructor(type, { suffix = '', allCaps = false } = {}) {
    this._type        = type
    this._suffix      = suffix
    this._allCaps     = allCaps
    this._server      = new config.serverClass()
  }

  /**
   * Returns a promise that resolves to a text fragment of the requested type,
   * including any client-side modifications.
   */
  fetch() {
    const addSuffix = (fragmentText) => `${ fragmentText }${ this._suffix }`
    return this._server.get(this._type)
  }

}

export default FragmentFetcher
