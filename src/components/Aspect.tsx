import { aspectAtom } from "@/misc/store"
import { Select } from "@radix-ui/themes"
import { useSetAtom } from "jotai"

const aspects = {
    "16:9": 16 / 9,
    "4:3": 4 / 3,
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
