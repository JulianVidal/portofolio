/*
ui trends
box shadow
svg animation
 */

import { Visualize } from './Visualize.js'

const algorithm = 'Merge'

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
    visualize.algorithm.speed = 1 / parseInt(document.getElementById('speed').value) * 1000
    console.log(visualize.algorithm.array, visualize.algorithm)
    document.getElementsByTagName('canvas')[0].style.opacity = '1'
  }, 600)
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1'
})

window.onresize = () => {

  if (window.innerWidth > 635) {
    visualize.canvas.setSize(window.innerWidth - 333, visualize.canvas.height)
  } else {
    visualize.canvas.setSize(303, visualize.canvas.height)
  }

  visualize.reset()
}

function handleClick({target}) {
  let element = target

  while (!element.id) {
    element = element.parentNode
    if (element === null) return;
  }

  switch (element.id) {
    case 'shuffle-btn':
      visualize.shuffling()
      break
    case 'sort-btn':
        visualize.sorting()
      break
    case 'rainbow':
      visualize.state()
      break
    case 'tracked':
      visualize.state()
      break
    case 'reset-btn':
      visualize.reset()
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
    case 'Selection-sort':
      changeAlgorithm('Selection')
  }
}

function handleInput(event) {
  const element = event.target

  switch (element.id) {
    case 'speed':
      visualize.algorithm.speed = 1 / element.value * 1000
      break
    case 'size':
      visualize.reset()
      break
  }
}

document.addEventListener('click', event => {handleClick(event)})
document.addEventListener('input', event => {handleInput(event)})
