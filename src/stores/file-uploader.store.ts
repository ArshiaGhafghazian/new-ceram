import { create } from 'zustand'

type FileUploderType = {
  isUploaderOpen: boolean
  openUploader: () => void
  closeUploader: () => void
}

export const useFileUploaderStore = create<FileUploderType>((set) => ({
  isUploaderOpen: false,
  openUploader: () => set({ isUploaderOpen: true }),
  closeUploader: () => set({ isUploaderOpen: false }),
}))