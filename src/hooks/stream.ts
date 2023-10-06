import { useRef } from "react"

// Stream hook
export const useStream = () => {
    const ref = useRef<HTMLVideoElement>(null)
    return [ref, (stream: MediaStream) => {
        if (ref.current === null) return
        ref.current.srcObject = stream
    }] as const
}
