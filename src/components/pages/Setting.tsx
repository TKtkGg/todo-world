import { memo, useEffect, useState, type FC } from "react"
import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react"
import { PrimaryButton } from "../atoms/button/PrimaryButton"
import { useMessage } from "../../hooks/useMessage"
import { fetchProfile, updateProfile } from "../../api/profile"

export const Setting: FC = memo(() => {
  const { showMessage } = useMessage()

  const [isPublic, setIsPublic] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const profile = await fetchProfile()
        setIsPublic(profile.isPublic)
      } catch (error) {
        showMessage({
          title: error instanceof Error ? error.message : "設定の取得に失敗しました",
          type: "error",
        })
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [showMessage])

  const handleApply = async () => {
    setIsSaving(true)
    try {
      const updated = await updateProfile({ isPublic })
      setIsPublic(updated.isPublic)
      showMessage({
        title: "設定を適用しました",
        type: "success",
      })
    } catch (error) {
      showMessage({
        title: error instanceof Error ? error.message : "設定の適用に失敗しました",
        type: "error",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <Flex align="center" justify="center" height="70vh">
        <Spinner size="xl" />
      </Flex>
    )
  }

  return (
    <div>
      <Heading
        as="h1"
        size="3xl"
        textAlign="center"
        paddingTop={{ base: 3, md: 5 }}
      >
        設定
      </Heading>

      <Flex
        direction="column"
        align="center"
        py={{ base: 6, md: 10 }}
        px={{ base: 4, md: 8 }}
      >
        <Box
          w="100%"
          maxW="720px"
          bg="white"
          borderRadius="12px"
          boxShadow="md"
          px={{ base: 4, md: 6 }}
          py={{ base: 5, md: 6 }}
        >
          <Flex
            align={{ base: "stretch", sm: "center" }}
            justify="space-between"
            direction={{ base: "column", sm: "row" }}
            gap={4}
          >
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                プロフィールの公開設定
              </Text>
            </Box>

            <select
              value={isPublic ? "public" : "private"}
              onChange={(e) => setIsPublic(e.target.value === "public")}
              style={{
                minWidth: "140px",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #CBD5E0",
                backgroundColor: "white",
                fontSize: "14px",
              }}
            >
              <option value="public">公開 (Public)</option>
              <option value="private">非公開 (Private)</option>
            </select>
          </Flex>

          <Box mt={6} w="100%" css={{ "& > button": { width: "100%" } }}>
            <PrimaryButton disabled={isSaving} onClick={handleApply}>
              {isSaving ? "適用中..." : "適用"}
            </PrimaryButton>
          </Box>
        </Box>
      </Flex>
    </div>
  )
})
