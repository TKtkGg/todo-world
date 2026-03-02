import { Flex, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { FC, memo, useEffect } from "react"
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";

export const UserManagement: FC = memo(() => {
  const { users, loading, getUsers } = useAllUsers();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (loading) {
    return(
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    )
  }

  return (
    <Wrap p={{ base: 4, md: 10 }}>
      {users.map((user) => (
        <WrapItem mx="auto">
          <UserCard imageUrl="https://picsum.photos/800" username={user.username} />
        </WrapItem>
      ))}
    </Wrap>
  );
});