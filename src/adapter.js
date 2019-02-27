class Adapter {
  constructor() {
    this.base = 'http://localhost:3000'
  }

  request(endpoint, opts) {
    const url = `${this.base}/${endpoint}`
    return fetch(url, opts)
      .then(res => res.json())
  }

  send(endpoint, obj, method = "POST") {
    const url = (id in obj) ? `${endpoint}/${obj.id}` : endpoint

    const opts = {
      method: method,
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(obj)
    }

    return this.request(url, opts)
  }

  post(endpoint, obj) {
    return this.send(endpoint, obj, "POST")
  }

  patch(endpoint, obj) {
    return this.send(endpoint, obj, "PATCH")
  }

  delete(endpoint, obj) {
    const url = `${endpoint}/${obj.id}`
    return request(url, {method: "DELETE"})
  }
}

// Adapter.base = 'http://localhost:3000'

class TrainerAPI extends Adapter {
  constructor() {
    super()
    this.endpoint = 'trainers'
  }

  all() {
    return this.request(this.endpoint)
  }

  /* version 2.0 */

  // find(id) {
  //   return this.request(`${this.endpoint}/${id}`)
  // }

  // update(trainer) {
  //   return this.patch(this.endpoint, trainer)
  // }

  // delete(trainer) {
  //   return this.delete(this.endpoint, trainer)
  // }
}

class PokemonAPI extends Adapter {
  constructor() {
    super()
    this.endpoint = 'pokemons'
  }

  create(pokemon) {
    return this.post(this.endpoint, pokemon)
  }

  delete(pokemon) {
    return this.delete(this.endpoint, pokemon)
  }
}

