function checkForValidUrl(tabId, changeInfo, tab) {
  // If the tabs url contains pinkbike.com
  if (tab.url.indexOf('pinkbike.com') > -1) {
    // ... show the page action.
    chrome.pageAction.show(tabId);
    chrome.pageAction.setTitle({tabId: tabId, title: "PBVidCast - Chromecast™ for Pinkbike videos"});
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
