import { Visualize } from './Visualize.js'

const algorithm = 'Bubble'

const visualize = new Visualize(algorithm)
visualize.algorithm.array = visualize.algorithm.shuffle(visualize.algorithm.array)

visualize.state()
console.log(visualize.algorithm.array)

const actives = [...document.getElementsByClassName('nav-active')]
actives.forEach(element => {
  element.classList.remove('nav-active')
})
document.getElementById(algorithm + '-sort').classList.add('nav-active')

function changeAlgorithm (algorithm) {
  const actives = [...document.getElementsByClassName('nav-active')]
  actives.forEach(element => {
    element.classList.remove('nav-active')
  })
  document.getElementById(algorithm + '-sort').classList.add('nav-active')

  document.getElementsByTagName('canvas')[0].style.opacity = '0'

  setTimeout(() => {
    visualize.changeAlgorithm(algorithm)
    console.log(visualize.algorithm.array, visualize.algorithm)
    document.getElementsByTagName('canvas')[0].style.opacity = '1'
  }, 600)
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1'
})

window.onresize = visualize.resize

function handleClick({target}) {
  let element = target

  while (!element.id) {
    element = element.parentNode
    if (element === null) return;
  }

  switch (element.id) {
    case 'shuffle-btn':
      visualize.animate('shuffling', visualize.speed)
      if (!visualize.isShuffling) visualize.algorithm.animateShuffle(visualize.algorithm.array)
      break
    case 'sort-btn':
      visualize.animate('sorting', visualize.speed)
      break
    case 'rainbow':
      visualize.state()
      break
    case 'tracked':
      visualize.state()
      break
    case 'reset-btn':
      visualize.reset()
      visualize.state()
      break
    case 'start-btn':
      visualize.resume()
      break
    case 'stop-btn':
      visualize.stop()
      break
    case 'Bubble-sort':
      changeAlgorithm('Bubble')
      break
    case 'Insertion-sort':
      changeAlgorithm('Insertion')
      break
    case 'Quick-sort':
      changeAlgorithm('Quick')
      break
    case 'Merge-sort':
      changeAlgorithm('Merge')
      break
  }
}

function handleInput(event) {
  const element = event.target

  switch (element.id) {
    case 'speed':
      visualize.changeSpeed(element.value)
      break
    case 'size':
      visualize.changeSize(element.value)
      break
  }
}

document.addEventListener('click', event => {handleClick(event)})
document.addEventListener('input', event => {handleInput(event)})
