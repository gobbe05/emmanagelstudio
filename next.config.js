module.exports = (phase, {defaultConfig}) => {
  return {
    ...defaultConfig,

    
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        "fs": false,
         "path": false,
         "os": false,
         "crypto": false,
         "http": false,
         "http2": false,
         "https": false,
         "zlib": false,
         "net": false,
         "path": false,
         "stream": false,
         "querystring": false,
         "child_process": false,
         "tls": false
      }
    }
    return config
    },
  }
}