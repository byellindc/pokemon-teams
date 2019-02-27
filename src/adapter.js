class Adapter {
  static request(endpoint, opts) {
    const url = `${Adapter.base}/${endpoint}`
    return fetch(url, opts)
      .then(res => res.json())
  }

  static send(endpoint, obj, method = "POST") {
    const url = (id in obj) ? `${endpoint}/${obj.id}` : endpoint

    const opts = {
      method: method,
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(obj)
    }

    return request(url, opts)
  }

  static post(endpoint, obj) {
    return Adapter.send(endpoint, obj, "POST")
  }

  static patch(endpoint, obj) {
    return Adapter.send(endpoint, obj, "PATCH")
  }

  static delete(endpoint, obj) {
    const url = `${endpoint}/${obj.id}`
    return request(url, {method: "DELETE"})
  }

  /* trainers */

  static getTrainers() {
    return Adapter.request('trainers')
  }

  static getTrainer(id) {
    return Adapter.request(`trainers/${id}`)
  }

  static createTrainer(trainer) {
    return Adapter.post('trainers', trainer)
  }

  static updateTrainer(trainer) {
    return Adapter.patch('trainers', trainer)
  }

  static deleteTrainer(trainer) {
    return Adapter.delete('trainers', trainer)
  }

  /* pokemon */

  static getPokemons() {
    return Adapter.request('pokemons')
  }

  static getPokemon(id) {
    return Adapter.request(`pokemons/${id}`)
  }

  static createPokemon(poke) {
    return Adapter.post('pokemons', poke)
  }

  static updatePokemon(poke) {
    return Adapter.patch('pokemons', poke)
  }

  static deletePokemon(poke) {
    return Adapter.delete('pokemons', poke)
  }
}

Adapter.base = 'http://localhost:3000'