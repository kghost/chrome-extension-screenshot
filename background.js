chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.captureVisibleTab({"format": "png"}, function(screenshotUrl) {
		fetch(screenshotUrl).then(res => res.blob()).then(function (blob) {
			var e = document.createElement("img");
			e.src = screenshotUrl;
			document.body.appendChild(e);

			var s = window.getSelection()
			var r = document.createRange();
			r.selectNode(e);
			s.addRange(r)
			document.execCommand('copy');
			s.removeAllRanges()

			document.body.removeChild(e);
			chrome.notifications.create({
				"type": "basic",
				"iconUrl": screenshotUrl,
				"title": "Tab captured",
				"message": ""
			})
		})
	});
});
