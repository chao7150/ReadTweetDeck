const read = text => {
  const uttr = new SpeechSynthesisUtterance(text.substr(0, 30))
  uttr.rate = 1.7
  speechSynthesis.speak(uttr)
}

const extractText = node => {
  const tweetElement = node.firstElementChild.firstElementChild
  const headerText = tweetElement.getElementsByTagName("header")[0].innerText.trim()
  const lengthOfName = headerText.indexOf("@")
  const name = headerText.substr(0, lengthOfName)
  read(name)
  const tweetFullText = tweetElement.getElementsByClassName("js-tweet-text")[0].innerText
  const tweetShortText = tweetFullText.split("#")[0]
  read(tweetShortText)
}

const run = () => {
  const target = document.getElementsByClassName("js-chirp-container")
  Array.from(target).forEach(column => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type !== "childList") {
          return
        }
        Array.from(mutation.addedNodes).reverse().forEach(extractText)
      })
    })
    const config = { attributes: true, childList: true, characterData: true }
    observer.observe(column, config)
  })
}

setTimeout(run, 5000)