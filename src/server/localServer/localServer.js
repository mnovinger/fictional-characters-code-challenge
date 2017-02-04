import { sample } from 'lodash'

import BaseServer from '../baseServer'

const FRAGMENT_DICTIONARY = require('./fragments.yml')

class LocalServer extends BaseServer {

  // override
  get(type) {
    return Promise.resolve(sample(FRAGMENT_DICTIONARY[type]))
  }

}

export default LocalServer
