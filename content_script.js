// var clickCount = 0

// document.addEventListener('click', () => {
//   if (clickCount > 1) {
//     window.alert('まじでやっちまった')
//     clickCount = 0
//   } else {
//     window.alert('やべっ、やべっ')
//     clickCount++;
//   }
// })

// document.addEventListener('load', (event) => {
//   console.log(event)
// })

const onMouse = evt => {
  console.log(evt)
  // console.log('test', chrome.extension.getURL('icons/icon128.png'))
  // evt.target.style.backgroundImage = chrome.extension.getURL('icons/icon128.png')
  var icon = document.createElement('img').setAttribute('src', chrome.extension.getURL('icons/icon128.png'))
  evt.target.appendChild(icon)
}

document.addEventListener("mousemove", onMouse)
// document.removeEventListener("mousemove", onMouse)


// const onMouse = evt => {
//   evt.target.style.border = "2px solid #f00"
//   _target = evt.target
//   const selector = getSelectorFromElement(evt.target)
//   chrome.runtime.sendMessage({selector: selector})
// }

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action == "activate") {
//   } else if (request.action == "deactivate") {
//     document.removeEventListener("mousemove", onMouse)
//   }
// })
