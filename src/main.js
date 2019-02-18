const readText = text => {
  const uttr = new SpeechSynthesisUtterance(text.substr(0, 30))
  uttr.rate = 1.7
  speechSynthesis.speak(uttr)
}

const extractText = node => {
  const tweetElement = node.firstElementChild.firstElementChild
  const headerText = tweetElement.getElementsByTagName("header")[0].innerText.trim()
  const lengthOfName = headerText.indexOf("@")
  const name = headerText.substr(0, lengthOfName)
  const tweetFullText = tweetElement.getElementsByClassName("js-tweet-text")[0].innerText
  const tweetShortText = tweetFullText.split("#")[0]
  return {name, tweetShortText}
}

const isHomeTimeline = container => container.parentNode.parentNode.previousElementSibling.textContent.trim().substr(0, 4) === "Home"

const run = () => {
  const target = document.getElementsByClassName("js-chirp-container")
  Array.from(target).filter(isHomeTimeline).forEach(column => {
    const observer = new MutationObserver(mutations => {
      mutations.filter(mutation => mutation.type === "childList").forEach(mutation => {
        Array.from(mutation.addedNodes).reverse().forEach(tweetNode => {
          const {name, tweetShortText} = extractText(tweetNode)
          readText(name)
          readText(tweetShortText)
        })
      })
    })
    const config = { attributes: true, childList: true, characterData: true }
    observer.observe(column, config)
  })
}

setTimeout(run, 5000)