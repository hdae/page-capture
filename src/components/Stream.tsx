import { useStream } from "@/hooks/stream"
import { aspectAtom, fullscreenAtom } from "@/misc/store"
import { MediaDeviceObj } from "@/misc/types"
import { makeConstraint } from "@/utils/constraint"
import { useAtom, useAtomValue } from "jotai"
import { useMemo } from "react"

export type ConstraintOptions = Omit<MediaTrackConstraintSet, "deviceId" | "groupId">

export type StreamProps = {
    device: MediaDeviceObj
}

const defaultOption = {
    autoGainControl: false,
    echoCancellation: false,
    noiseSuppression: false,
    width: { min: 0, max: 3840 },
    height: { min: 0, max: 2160 },
}

export const Stream = ({ device }: StreamProps) => {
    const [videoRef, setStream] = useStream()
    const aspect = useAtomValue(aspectAtom)
    const [fullscreen, setFullscreen] = useAtom(fullscreenAtom)

    useMemo(
        () => navigator.mediaDevices
            .getUserMedia(
                makeConstraint(
                    device,
                    {
                        ...defaultOption,
                        aspectRatio: { exact: aspect },
                    }
                )
            )
            .then(setStream),
        [device, aspect]
    )

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
