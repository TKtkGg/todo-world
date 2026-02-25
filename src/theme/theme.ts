import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
    globalCss: {
        body: {
            backgroundColor: "gray.100",
            color: "gray.800",
        }
    }
});