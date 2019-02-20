const createUttr = text => {
  const uttr = new SpeechSynthesisUtterance(text)
  uttr.rate = 1.6
  return uttr
}

const extractText = node => {
  const tweetElement = node.firstElementChild.firstElementChild
  const name = tweetElement.getElementsByClassName("fullname")[0].textContent
  const text = tweetElement.getElementsByClassName("js-tweet-text")[0].textContent
  return {name, text}
}

const isHomeTimeline = container => container.parentNode.parentNode.previousElementSibling.textContent.trim().substr(0, 4) === "Home"

const run = () => {
  const target = document.getElementsByClassName("js-chirp-container")
  Array.from(target).filter(isHomeTimeline).forEach(column => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        Array.from(mutation.addedNodes).reverse().forEach(tweetNode => {
          const {name, text} = extractText(tweetNode)
          speechSynthesis.speak(createUttr(name))
          speechSynthesis.speak(createUttr(speechSynthesis.pending ? text.substr(0, 30) : text))
        })
      })
    })
    observer.observe(column, {childList: true})
  })
}

setTimeout(run, 5000)