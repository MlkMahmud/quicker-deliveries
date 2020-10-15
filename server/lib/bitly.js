import axios from 'axios';

const accessToken = process.env.BITLY_TOKEN;

async function shortenUrl(long_url) {
  const { data } = await axios({
    url: 'https://api-ssl.bitly.com/v4/shorten',
    method: 'POST',
    data: { long_url },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data.link;
}

export default {
  shortenUrl,
};
