import { resolutionAtom } from "@/misc/store"
import { Select } from "@radix-ui/themes"
import { useSetAtom } from "jotai"

const resolutions = {
    "auto": undefined,
    "2160p": 2160,
    "1080p": 1080,
    "720p": 720,
    "480p": 480,
}

export const Resolutions = () => {
    const setResolution = useSetAtom(resolutionAtom)

    return (
        <Select.Root onValueChange={(value: keyof typeof resolutions) => setResolution(resolutions[value])}>
            <Select.Trigger placeholder="Resolution" />
            <Select.Content>
                {Object.entries(resolutions).map(([key]) => (
                    <Select.Item key={key} value={key}>
                        {key}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}
