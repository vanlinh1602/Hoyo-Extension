chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	console.log(msg, sender);

	chrome.cookies.getAll({ domain: '.hoyolab.com' }, (cookies) => {
		console.log(cookies);
	});
	sendResponse('ok');
});
