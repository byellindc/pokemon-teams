const trainerAPI = new TrainerAPI()
const pokeAPI = new PokemonAPI()
let trainers = []

document.addEventListener('DOMContentLoaded', () => {
  loadTrainers()
})

/* api/data */

function loadTrainers() {
  trainerAPI.all().then(trainerResp => {
    trainers = trainerResp
    renderTrainers(trainers)
  })
}

function addPokemon(trainer) {
  const pokeList = trainerCard(trainer.id, '.poke-list')
  if (!pokeList) throw 'No Trainer Pokemon List Found'

  trainerAPI.newPokemon(trainer)
    .then(poke => renderPokemon(poke, pokeList))
}

/* helpers */

function trainerCard(trainer_id, selector) {
  const card = document.querySelector(`.card[data-id="${trainer_id}"]`)
  if (!card) throw 'No Trainer Card Found'
  
  if (typeof selector === 'undefined') return card
  return card.querySelector(selector)
}

function pokemonItem(pokemon_id) {
  return document.querySelector(`.poke[data-id="${pokemon_id}"]`)
}

/* dom */

function renderTrainers(trainers) {
  const container = document.querySelector('.trainer-list')
  container.innerHTML = ''

  trainers.forEach(t => renderTrainer(t, container))
}

function renderTrainer(trainer, parent) {
  const card = document.createElement('div')
  card.classList.add('card', 'trainer-card')
  card.dataset.id = trainer.id

  card.innerHTML += `<p class="trainer-name">${trainer.name}</p>`

  const btn = document.createElement('button')
  btn.classList.add('add-btn')
  btn.innerText = "Add Pokemon"

  btn.addEventListener('click', e => handleAdd(trainer, e))
  card.appendChild(btn)

  const list = document.createElement('ul')
  list.classList.add('poke-list')
  trainer.pokemons.forEach(p => renderPokemon(p, list))
  card.appendChild(list)

  parent.appendChild(card)
}

function renderPokemon(poke, parent = undefined) {
  const li = document.createElement('li')
  li.classList.add('poke')
  li.dataset.id = poke.id
  li.dataset.trainerId = poke.trainer_id

  li.innerText = `${poke.nickname} (${poke.species}) `
  
  const btn = document.createElement('button')
  btn.classList.add('release-btn', 'release')
  btn.innerText = "Release"

  btn.addEventListener('click', e => handleRelease(poke, e))
  li.appendChild(btn)

  // if no parent if supplied, try to find based on trainer
  if (!parent) parent = trainerCard(poke.trainer_id, '.poke-list')

  if (!parent) throw 'No Pokemon List Found'
  parent.appendChild(li)
}

function removePokemon(poke) {
  pokemonItem(poke.id).remove()
}

/* event listeners */

function handleAdd(trainer, event) {
  trainerAPI.newPokemon(trainer).then(renderPokemon)
}

function handleRelease(poke, event) {
  pokeAPI.release(poke).then(removePokemon(poke))
}