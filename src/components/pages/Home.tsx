import { memo, type FC } from "react"
import { useAuth } from "../../contexts/AuthContent";
import { useTodos } from "../../contexts/TodoContext";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { TodoListPreview } from "../organisms/todo/TodoListPreview";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const Home: FC = memo(() => {
  const { user, isLoading } = useAuth();
  const { incompleteTodos, completeTodos } = useTodos();
  const navigate = useNavigate();

  if(isLoading) {
    return <div>読み込み中...</div>;
  }

    return (
      <Flex
      w="100%" 
      py={{ base: 4, md: 6 }}
      px={{ base: 4, md: 6 }}>

        <Box flex="1">
          <Heading as="h1" size="2xl">Home</Heading>
          {user && (<Text mt={2}>ようこそ、{user.username}</Text>)}
        </Box>

        <Box flex="1" maxW={{ md: "400px"}}>
          <TodoListPreview incompleteTodos={incompleteTodos} completeTodos={completeTodos} />
          <Box mt={4}>
            <PrimaryButton onClick={() => navigate("/home/todo_list")}>
              編集する
            </PrimaryButton>
          </Box>
        </Box>
      </Flex>
    );
  });
  
  

  