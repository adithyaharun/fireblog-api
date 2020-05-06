export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    let date = new Date();
    console.log(`[${date.toUTCString()}] ${config.method} Request: ${config.url}`)
  });
}