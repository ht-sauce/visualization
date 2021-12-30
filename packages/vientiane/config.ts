type Config = {
  [url: string]: string
}

const config: Config = {
  url: '',
}

function setConfig(options: Config): void {
  for (const key in config) {
    if (options[key]) {
      config[key] = options[key]
    }
  }
}

export { config, setConfig, Config }
