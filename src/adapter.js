class Adapter {
  static getPokemons() {
    return fetch(Adapter.api)
      .then(res => res.json())
  }

  static getPokemon(id) {
    return fetch(`${Adapter.api}/${id}`)
      .then(res => res.json())
  }

  static createPokemon(poke) {
    const opts = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(poke)
    }
    return fetch(Adapter.api)
      .then(res => res.json())
  }

  static updatePokemon(poke) {
    const opts = {
      method: "PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(poke)
    }
    return fetch(`${Adapter.api}/${id}`)
      .then(res => res.json())
  }

  static deletePokemon(poke) {
    return fetch(`${Adapter.api}/${id}`, 
      {method: "DELETE"})
      .then(res => res.json())
  }
}

Adapter.api = 'http://localhost:3000/pokemons'