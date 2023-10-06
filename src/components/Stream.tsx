import { useStream } from "@/hooks/stream"
import { fullscreenAtom } from "@/misc/store"
import { MediaDeviceObj } from "@/misc/types"
import { makeConstraint } from "@/utils/constraint"
import { useAtom } from "jotai"
import { useMemo } from "react"

export type StreamProps = {
    device: MediaDeviceObj
}

export const Stream = ({ device }: StreamProps) => {
    const [videoRef, setStream] = useStream()
    const [fullscreen, setFullscreen] = useAtom(fullscreenAtom)

    useMemo(() => navigator.mediaDevices
        .getUserMedia(makeConstraint(device))
        .then(setStream), [device])

    if (videoRef.current !== null && fullscreen) {
        videoRef.current.requestFullscreen()
            .then(() => {
                document.addEventListener(
                    "fullscreenchange",
                    () => setFullscreen(false),
                    { once: true }
                )
            })
    }

    return <video
        ref={videoRef}
        autoPlay
        style={{
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
        }}
    />
}
