import { Devices } from "@/components/Devices"
import { Stream } from "@/components/Stream"
import { Button, Card, Flex, useThemeContext } from "@radix-ui/themes"
import { useAtomValue, useSetAtom } from "jotai"
import { deviceAtom, fullscreenAtom } from "./misc/store"

export function App() {
    const device = useAtomValue(deviceAtom)
    const setFullscreen = useSetAtom(fullscreenAtom)

    const { appearance } = useThemeContext()
    document.documentElement.setAttribute("class", `${appearance}-theme`)
    document.documentElement.style.colorScheme = "appearance"

    return (
        <Flex
            p="2"
            gap="2"
            width="100%"
            height="100%"
            direction="column"
            style={{
                overflow: "hidden"
            }}>
            <Card>
                <Flex gap="2" direction="row">
                    <Devices />
                    <Button onClick={() => {
                        if (device !== undefined) {
                            setFullscreen(value => !value)
                        }
                    }}>
                        Full Screen
                    </Button>
                </Flex>
            </Card>
            <Flex
                width="100%"
                height="100%"
                align="center"
                justify="center"
                style={{
                    flex: "1 1 0",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    overflow: "hidden",
                }}>
                {device === undefined
                    ? <div></div>
                    : <Stream device={device} />}
            </Flex>
        </Flex>
    )
}
