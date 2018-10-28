const fetch = (url, options) => window.fetch(url, Object.assign(options || {}, {
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
  },
}));

export default fetch;
