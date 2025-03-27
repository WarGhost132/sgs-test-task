const getEnvVar = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`)
  }
  return import.meta.env[key] || ""
}

export const isDevEnv = getEnvVar("DEV")
export const isProdEnv = getEnvVar("PROD")
