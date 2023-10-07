import { aspectAtom } from "@/misc/store"
import { Select } from "@radix-ui/themes"
import { useSetAtom } from "jotai"

const aspects = {
    "auto": undefined,
    "16:9": 16 / 9,
    "4:3": 4 / 3,
    "3:2": 3 / 2,
}

export const Aspects = () => {
    const setAspect = useSetAtom(aspectAtom)

    return (
        <Select.Root onValueChange={(value: keyof typeof aspects) => setAspect(aspects[value])}>
            <Select.Trigger placeholder="Aspect Ratio" />
            <Select.Content>
                {Object.entries(aspects).map(([key]) => (
                    <Select.Item key={key} value={key}>
                        {key}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}
