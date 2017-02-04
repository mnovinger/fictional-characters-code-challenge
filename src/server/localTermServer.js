import { sample } from 'lodash'

import BaseTermServer from './baseTermServer'

const TERMS = require('../terms.yml')

class LocalTermServer extends BaseTermServer {

  get(type) {
    return new Promise((resolve) => {
      resolve(sample(TERMS[type]))
    })
  }

}

export default LocalTermServer
