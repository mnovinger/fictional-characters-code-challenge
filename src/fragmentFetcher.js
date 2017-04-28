import config from './config'

/**
 * Fetch a random fragment from the server of the specified type, and then make any specified
 * modifications as part of the promise chain.
 */
class FragmentFetcher {

  constructor(type, { suffix = '', startCase = false } = {}) {
    this._type      = type
    this._suffix    = suffix
    this._startCase = startCase
    this._server    = new config.serverClass()
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
