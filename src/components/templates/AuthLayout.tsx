import { Flex, Heading } from "@chakra-ui/react"
import { memo, type FC, type ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const AuthLayout: FC<Props> = memo((props) => {
  const { children } = props

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      px={4}
      py={{ base: 8, md: 10 }}
      gap={{ base: 6, md: 8 }}
    >
      <Heading
        as="h1"
        size={{ base: "4xl", md: "5xl" }}
        textAlign="center"
        color="teal.600"
        letterSpacing="wide"
        fontWeight="bold"
      >
        TODO WORLD
      </Heading>
      {children}
    </Flex>
  )
})
