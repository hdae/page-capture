import "ress"

import "@radix-ui/themes/styles.css"

import { App } from "@/App.tsx"
import { Box, Theme } from "@radix-ui/themes"
import { ReactNode, StrictMode } from "react"
import { createRoot } from "react-dom/client"

const root = document.getElementById("root")
if (root === null) throw new Error("Failed to initialize application.")

// Theme
const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Theme
            hasBackground
            appearance={"dark"}
            accentColor="indigo"
            grayColor="slate"
            radius="medium">
            {children}
        </Theme>
    )
}

createRoot(root).render(
    <StrictMode>
        <ThemeProvider>
            <Box style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden"
            }}>
                <App />
            </Box>
        </ThemeProvider>
    </StrictMode>
)
