import BaseTermServer from './baseTermServer'

const TERMS = require('../terms.yml')

class LocalTermServer extends BaseTermServer {

  get(type) {
    return new Promise((resolve) => {
      resolve(TERMS[type].sample())
    })
  }

}

export default LocalTermServer
