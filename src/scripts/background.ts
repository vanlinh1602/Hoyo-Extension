import { cookiesGet } from '../lib/options';

const syncToken = async (data: { discordId: string }) => {
  const { discordId } = data;

  const upload: {
    discordId: string;
    cookies: { [T: string]: string };
  } = {
    discordId,
    cookies: {},
  };
  const cookies = await chrome.cookies.getAll({ domain: '.hoyolab.com' });
  Object.entries(cookiesGet).forEach(([key, value]) => {
    const cookieFind = cookies.find((cookie) => cookie.name === value);
    upload.cookies[key] = cookieFind?.value || '';
  });
  return upload;
};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const result = await syncToken(message.data);
  sendResponse(result);
});
