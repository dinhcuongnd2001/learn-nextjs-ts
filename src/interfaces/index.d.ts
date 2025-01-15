import { AxiosError } from "axios"
import { extractEtag } from "next/dist/server/image-optimizer"
import { IResponse } from "./response.interface"

export * from "./token.interface"
export * from './response.interface'
export * from './user.interface'

export interface IErrorResponse extends AxiosError<any, IResponse<any>> {}