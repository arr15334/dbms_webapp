const config = {
  env: 'local',

  local: {
    domain: 'localhost',
    root: 'http://localhost:8080',
    apiRoot: 'http://localhost:3000',
    cookieDomain: 'localhost',
    cookieSecure: false,
    analytics: '',
    forgotCallback: '/#/reset'
  },

  apiTables: '/databases/{db}/tables',
  apiDatabases: '/databases',
  apiQuery: '/databases/queries'
}

export default config
