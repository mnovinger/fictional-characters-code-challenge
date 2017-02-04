import { sample } from 'lodash'

import BaseServer from './baseServer'

const FRAGMENTS = require('../fragments.yml')

class LocalServer extends BaseServer {

  // override
  get(type) {
    return new Promise((resolve) => {
      resolve(sample(FRAGMENTS[type]))
    })
  }

}

export default LocalServer
