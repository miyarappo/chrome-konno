var clickCount = 0

document.addEventListener('click', () => {
  if (clickCount > 1) {
    window.alert('まじでやっちまった')
    clickCount = 0
  } else {
    window.alert('やべっ、やべっ')
    clickCount++;
  }
})


// chrome.extension.getURL('icons/icon128.png') で取得出来なかったのでSNSから取得
const images = [
  'https://cdn.profile-image.st-hatena.com/users/y-konno0528/profile.png?1531320070',
  'https://pbs.twimg.com/profile_images/1045808716799299589/G7BF-mgX_400x400.jpg'
]

window.scrollY =  window.innerHeight

var count = 1

document.addEventListener('scroll', () => {
  if (window.pageYOffset > window.innerHeight*count) {
    replaceImg()
    count++
  }
})

function replaceImg() {
  const targetElements = document.querySelectorAll('img')

  targetElements.forEach((element) => {
    element.setAttribute('src', images[Math.floor(Math.random() * 2)])
  })
}

replaceImg()
