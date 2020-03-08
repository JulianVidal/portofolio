import { Visualize } from './Visualize.js'

const algorithm = 'Quick'

const visualize = new Visualize(algorithm)
visualize.array = visualize.algorithm.shuffle(visualize.array)

const actives = [...document.getElementsByClassName('nav-active')]
actives.forEach(element => {
  element.classList.remove('nav-active')
})
document.getElementById(algorithm + '-sort').classList.add('nav-active')

visualize.state()
console.log(visualize.array)

function changeAlgorithm (algorithm) {
  const actives = [...document.getElementsByClassName('nav-active')]
  actives.forEach(element => {
    element.classList.remove('nav-active')
  })
  document.getElementById(algorithm + '-sort').classList.add('nav-active')

  document.getElementsByTagName('canvas')[0].style.opacity = '0'

  setTimeout(() => {
    visualize.changeAlgorithm(algorithm)
    console.log(visualize.array, visualize.algorithm)
    document.getElementsByTagName('canvas')[0].style.opacity = '1'
  }, 600)
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1'
})

window.onresize = () => {
  visualize.canvas.setSize(window.innerWidth - 333, visualize.canvas.height)
  visualize.reset()
  visualize.state()
}

function handleClick({target}) {
  let element = target

  while (!element.id) {
    element = element.parentNode
    if (element === null) return;
  }

  switch (element.id) {
    case 'shuffle-btn':
      visualize.animate('shuffling', visualize.speed)
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
