import { Visualize } from './Visualize.js'

document.getElementById('Bubble-sort').addEventListener('click', () => { changeAlgorithm('Bubble') })
document.getElementById('Insertion-sort').addEventListener('click', () => { changeAlgorithm('Insertion') })

const algorithm = 'Insertion'

const visualize = new Visualize(algorithm)

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

  document.getElementsByTagName('canvas')[0].style.opacity = 0

  setTimeout(() => {
    visualize.changeAlgorithm(algorithm)
    console.log(visualize.array, visualize.algorithm)
    document.getElementsByTagName('canvas')[0].style.opacity = 1
  }, 600)
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 1
})

window.onresize = () => {
  visualize.canvas.setSize((3 * window.innerWidth / 4), visualize.canvas.height)
  visualize.reset()
  visualize.state()
}

document.getElementById('shuffle-btn').addEventListener('click', () => { visualize.animate('shuffling', 60) })
document.getElementById('sort-btn').addEventListener('click', () => { visualize.animate('sorting', visualize.speed) })

document.getElementById('color').addEventListener('click', () => { visualize.state() })
document.getElementById('track').addEventListener('click', () => { visualize.state() })

document.getElementById('reset-btn').addEventListener('click', () => { visualize.reset(); visualize.state() })

document.getElementById('speed').addEventListener('input', e => { visualize.changeSpeed(e.target.value) })
document.getElementById('size').addEventListener('input', e => { visualize.changeSize(e.target.value) })

document.getElementById('start-btn').addEventListener('click', () => { visualize.resume() })
document.getElementById('stop-btn').addEventListener('click', () => { visualize.stop() })
