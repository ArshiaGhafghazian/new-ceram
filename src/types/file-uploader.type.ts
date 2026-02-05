import { Pagination } from "./api/pagination.type"

export type FileItem = {
  _id: string
  originalName: string
  fileName: string
  path: string
  mimeType: string
  size: number
  uploadDate: string // ISO date string
  url: string
}


export type GetFilesResponse = {
  data: FileItem[]
  pagination: Pagination
}
