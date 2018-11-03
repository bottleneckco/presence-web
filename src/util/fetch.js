const authedFetch = (url, options) => window.fetch(url, Object.assign(options || {}, {
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
  },
}));

const backendFetch = (route, options) => authedFetch(`${process.env.BACKEND_ROOT_URL}${route}`, options);

export {
  authedFetch,
  backendFetch,
};
