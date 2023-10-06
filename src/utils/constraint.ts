import { MediaDeviceObj } from "@/misc/types"

// Constraints maker
export const makeConstraint = ({ audio, video }: MediaDeviceObj) => ({
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
