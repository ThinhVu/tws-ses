import {Response} from 'express'
// @ts-ignore
import packageJson from "../../package.json"

export function apiError(e: Error | string, res: Response) {
   console.error(e)
   // @ts-ignore
   res.__error = true;
   res.status(500).send({error: typeof(e) === 'string' ? e : e.message})
}

export function getVersion() {
   return packageJson.version
}
