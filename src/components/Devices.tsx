import { deviceAtom } from "@/misc/store"
import { MediaDeviceObj } from "@/misc/types"
import { getDevices } from "@/utils/devices"
import { Select } from "@radix-ui/themes"
import { useSetAtom } from "jotai"
import { useEffect, useState } from "react"

export const Devices = () => {
    const setDevice = useSetAtom(deviceAtom)
    const [list, setList] = useState<{ [k: string]: MediaDeviceObj }>({})
    useEffect(() => { getDevices().then(setList) }, [])

    return (
        <Select.Root onValueChange={(value) => setDevice(list[value])}>
            <Select.Trigger placeholder="Select a Device" />
            <Select.Content>
                {Object.entries(list).map(([groupId, { video }]) => (
                    <Select.Item key={groupId} value={groupId}>
                        {video.label.replace(/\([^\(]+\)$/, "")}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}
