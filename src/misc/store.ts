import { atom } from "jotai"
import { MediaDeviceObj } from "./types"

export const deviceAtom = atom<MediaDeviceObj | undefined>(undefined)
export const aspectAtom = atom<number | undefined>(undefined)
export const resolutionAtom = atom<number | undefined>(undefined)
export const fullscreenAtom = atom<boolean>(false)
