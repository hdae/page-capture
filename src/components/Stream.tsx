import { useStream } from "@/hooks/stream"
import { aspectAtom, fullscreenAtom, resolutionAtom } from "@/misc/store"
import { MediaDeviceObj } from "@/misc/types"
import { makeConstraint } from "@/utils/constraint"
import { useAtom, useAtomValue } from "jotai"
import { useMemo } from "react"
import toast from "react-hot-toast"

export type ConstraintOptions = Omit<MediaTrackConstraintSet, "deviceId" | "groupId">

export type StreamProps = {
    device: MediaDeviceObj
}

const defaultOption: MediaTrackConstraints = {
    autoGainControl: false,
    echoCancellation: false,
    noiseSuppression: false,
}

const getWidth = (resolution?: number, aspect?: number) =>
    resolution === undefined || aspect === undefined
        ? undefined
        : Math.round(resolution * aspect)

export const Stream = ({ device }: StreamProps) => {
    const [videoRef, setStream] = useStream()
    const aspect = useAtomValue(aspectAtom)
    const resolution = useAtomValue(resolutionAtom)
    const [fullscreen, setFullscreen] = useAtom(fullscreenAtom)

    console.log(resolution)

    useMemo(
        () => navigator.mediaDevices
            .getUserMedia(
                makeConstraint(
                    device,
                    {
                        ...defaultOption,
                        aspectRatio: { exact: aspect },
                        width: {
                            min: 0,
                            max: 3840,
                            ideal: getWidth(resolution, aspect),
                        },
                        height: {
                            min: 0,
                            max: 2160,
                            ideal: resolution,
                        },
                    }
                )
            )
            .then(setStream)
            .catch(() => {
                console.log({ aspect, resolution })
                toast.error("Failed to set resolution.")
            }),
        [device, aspect, resolution]
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
