import { Box, Flex, Stack, Avatar, Input, Textarea } from "@chakra-ui/react";
import { memo, type ChangeEvent, type FC } from "react";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

type BaseProps = {
    username: string;
    message?: string;
    iconUrl?: string;
}

type ViewOnlyProps = BaseProps & {
    editable?: false;
}

type EditableProps = BaseProps & {
    editable: true;
    onUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onMessageChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onIconUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    isSaving: boolean;
};

type Props = ViewOnlyProps | EditableProps;

export const ProfileCard: FC<Props> = memo((props) => {
    const { username, message = "", iconUrl = "" } = props;
    const isEditable = props.editable === true;

    return (
        <Box
            w={isEditable ? { base: "100%", sm: "420px"} : "100%"}
            bg="white"  
            borderRadius="12px"
            boxShadow="md"
            p={{ base: 5, md: 6}}
        >
            <Stack gap={5} textAlign="center">
                <Flex justify="center">
                    <Avatar.Root size="2xl">
                        <Avatar.Fallback name={username || "user"} />
                        <Avatar.Image src={iconUrl || undefined} />
                    </Avatar.Root>
                </Flex>
                {isEditable ? (
                    <>
                        <Stack gap={2} textAlign="left">
                            <Box>
                                <Box fontSize="sm" color="gray.600" mb={1}>アイコン</Box>
                                <Input value={iconUrl} onChange={props.onIconUrlChange} placeholder="https://example.com/icon.png" />
                            </Box>

                            <Box>
                                <Box fontSize="sm" color="gray.600" mb={1}>ユーザーネーム</Box>
                                <Input value={username} onChange={props.onUsernameChange} placeholder="ユーザーネーム" />
                            </Box>

                            <Box>
                                <Box fontSize="sm" color="gray.600" mb={1}>メッセージ</Box>
                                <Textarea value={message} onChange={props.onMessageChange} placeholder="メッセージ" rows={4} />
                            </Box>
                        </Stack>
                        <PrimaryButton disabled={props.isSaving} onClick={props.onSave}>
                            {props.isSaving ? "保存中..." : "保存"}
                        </PrimaryButton>
                    </>
                ) : (
                    <Stack gap={2} textAlign="left">
                        <Box>
                            <Box fontSize="sm" color="gray.600" mb={1}>ユーザーネーム</Box>
                            <Box fontSize="sm" color="gray.600" mb={1} border="2px solid" borderColor="gray.500" p={2} borderRadius="md">{username}</Box>
                        </Box>
                        
                        <Box>
                            <Box fontSize="sm" color="gray.600" mb={1}>メッセージ</Box>
                            <Box fontSize="sm" color="gray.600" mb={1} border="2px solid" borderColor="gray.500" p={2} borderRadius="md">{message}</Box>
                        </Box>
                    </Stack>
                )}
                
            </Stack>
        </Box>
);
})