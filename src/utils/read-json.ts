import { readFile } from 'fs/promises'

export default async function raedJson(path: string): Promise<object> {
  const fileBuff = await readFile(path)
  const fileStr = String(fileBuff)
  return JSON.parse(fileStr)
}