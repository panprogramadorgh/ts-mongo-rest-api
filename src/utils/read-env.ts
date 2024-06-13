import { readFileSync as readFile } from 'fs'

export default function readEnv(envKey: string): string | undefined {
  let envValue: string | undefined = undefined;

  const envBuf = readFile("./.ENV")
  const envStr = String(envBuf)
  const env = envStr.split("\n").filter(eEnv => Boolean(eEnv))

  for (let eEnv of env) {
    const pair = eEnv.split("=")
    const key = pair[0].trim()
    const value = pair[1].trim()

    if (key === envKey) {
      envValue = value
      break
    }
  }
  return envValue
}