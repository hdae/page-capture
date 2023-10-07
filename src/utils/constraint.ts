import { ConstraintOptions } from "@/components/Stream"
import { MediaDeviceObj } from "@/misc/types"

// Constraints maker
export const makeConstraint = ({ audio, video }: MediaDeviceObj, options: ConstraintOptions): MediaStreamConstraints => ({
    audio: { deviceId: { exact: audio.deviceId }, ...options },
    video: { deviceId: { exact: video.deviceId }, ...options },
})
