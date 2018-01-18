const polyfillCustomEvent = _ => {
  if (typeof(window) !== 'undefined' && typeof(document) !== 'undefined') {
    try {
      new window.CustomEvent('', {})
      return CustomEvent
    } catch (e) {
      const WindowCustomEvent = (event, params) => {
        params = params || { bubbles: false, cancelable: false, detail: undefined }
        var evt = document.createEvent('CustomEvent')
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
        return evt
      }
      WindowCustomEvent.prototype = window.Event.prototype
      return WindowCustomEvent
    }
  } else {
    return _ => undefined
  }
}

const WindowCustomEvent = polyfillCustomEvent()

const dispatchEvent = (log, eventName, eventData) => {
  const ev = new WindowCustomEvent(eventName, eventData)

  log && console.log('[b2w-ab-storage] CUSTOM EVENT', eventName, eventData, ev)

  document && document.dispatchEvent(ev)

  return ev
}

export default dispatchEvent
