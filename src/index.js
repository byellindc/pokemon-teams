const trainerAPI = new TrainerAPI()
const pokeAPI = new PokemonAPI()

document.addEventListener('DOMContentLoaded', () => {
  loadTrainers()
})

/* api/data */

function loadTrainers() {
  trainerAPI.all().then(renderTrainers)
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
  card.appendChild(btn)

  const list = document.createElement('ul')
  trainer.pokemons.forEach(p => renderPokemon(p, list))
  card.appendChild(list)

  parent.appendChild(card)
}

function renderPokemon(poke, parent) {
  const li = document.createElement('li')
  li.dataset.id = poke.id
  li.dataset.trainerId = poke.trainer_id

  li.innerText = `${poke.nickname} (${poke.species}) `
  
  const btn = document.createElement('button')
  btn.classList.add('add-btn')
  btn.innerText = "Release"
  li.appendChild(btn)

  parent.appendChild(li)
}