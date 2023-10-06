import styles from "./App.module.css"

import { useEffect, useRef, useState } from "react"

type MediaDevicePair = [MediaDeviceInfo, MediaDeviceInfo]

const getDevices = async () => {
    // Request media, but only get permissions.
    await navigator.mediaDevices.getUserMedia({ audio: true, video: true })

    // Get media devices.
    const table: { [key: string]: Partial<MediaDevicePair> } = {}
    await navigator.mediaDevices.enumerateDevices()
        .then((devices) =>
            devices.forEach((device) => {
                if (device.kind === "audiooutput") return
                table[device.groupId] ??= []
                if (device.kind === "audioinput") table[device.groupId][0] = device
                if (device.kind === "videoinput") table[device.groupId][1] = device
            })
        )

    // Filter items by whether they have both Audio and Video
    return Object.values(table)
        .filter<MediaDevicePair>((value): value is MediaDevicePair => value[0] !== undefined && value[1] !== undefined)
        .map<MediaDevicePair>(([audio, video]) => [audio, video])
}

// Stream hook
const useStream = () => {
    const ref = useRef<HTMLVideoElement>(null)
    return [ref, (stream: MediaStream) => {
        if (ref.current === null) return
        ref.current.srcObject = stream
    }] as const
}

// Constraints maker
const makeConstraints = ([audio, video]: MediaDevicePair) => ({
    audio: {
        deviceId: { exact: audio.deviceId },
        autoGainControl: false,
        echoCancellation: false,
        noiseSuppression: false,
    },
    video: {
        deviceId: { exact: video.deviceId },
    }
})

export function App() {
    const [videoRef, setStream] = useStream()
    const [selected, setSelected] = useState<MediaDevicePair>()
    const [devices, setDevices] = useState<MediaDevicePair[]>()
    useEffect(() => { getDevices().then(setDevices) }, [])

    // Start streaming when device selected
    if (selected !== undefined) {
        navigator.mediaDevices
            .getUserMedia(makeConstraints(selected))
            .then(setStream)
    }

    return (
        <div className={styles.App}>
            <video ref={videoRef} autoPlay />
            {devices === undefined
                ? (
                    <div>
                        Failed to get video device.
                    </div>
                )
                : devices.map(([audio, video], index) => (
                    <button key={index} onClick={() => setSelected([audio, video])}>
                        {video.label.replace(/\([^\(]+\)$/, "")}
                    </button>
                ))}
        </div>
    )
}
