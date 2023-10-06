import { MediaDeviceObj } from "@/misc/types"

export const getDevices = async () => {
    // Request user permissions for accessing audio and video devices.
    await navigator.mediaDevices.getUserMedia({ audio: true, video: true })

    // Create a table to group devices by their groupId.
    const table: { [key: string]: Partial<MediaDeviceObj> } = {}

    // Iterate through enumerated devices and populate the table.
    for (const device of await navigator.mediaDevices.enumerateDevices()) {
        // Skip audio output devices.
        if (device.kind === "audiooutput") continue

        // Initialize an object for the groupId if not already present.
        const obj = table[device.groupId] ??= {}

        // Assign the device based on its kind (audio or video).
        if (device.kind === "audioinput") obj.audio = device
        if (device.kind === "videoinput") obj.video = device
    }

    // Filter only devices that contain both audio and video.
    const result = Object.entries(table).filter<[string, MediaDeviceObj]>(
        (tuple): tuple is [string, MediaDeviceObj] => (
            tuple[1].audio !== undefined &&
            tuple[1].video !== undefined
        )
    )

    // Convert the filtered result back into an object.
    return Object.fromEntries(result)
}
