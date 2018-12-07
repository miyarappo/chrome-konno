var _webConnection
var _window

const createWindow = url => {
  chrome.windows.create({ url: url, width: 400, height: 400, left: 200, top: 200 }, window => {

    // tab の読み込みが完了したら content_script の mouseover の処理を activate する
    const onUpdate = (tabId, changeInfo, tab) => {
      if (tabId == window.tabs[0].id && changeInfo.status == "complete") {
        chrome.tabs.sendMessage(window.tabs[0].id, {action: "activate"})
      }
    }
    chrome.tabs.onUpdated.addListener(onUpdate)

    _window = window
  })
}

// port = web ページへのコネクション
chrome.runtime.onConnectExternal.addListener(port => {
  _webConnection = port
  _webConnection.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "open") {
      createWindow(request.url)
    } else if (request.action == "close") {
      chrome.windows.remove(_window.id)
    }
  })
})

// content_script からのメッセージをそのまま web ページに返す
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  _webConnection.postMessage({selector: request.selector})
})
