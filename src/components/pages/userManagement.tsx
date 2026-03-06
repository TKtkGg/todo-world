import { Flex, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { memo, useEffect, type FC } from "react"
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useNavigate } from "react-router-dom";

export const UserManagement: FC = memo(() => {
  const { users, loading, getUsers } = useAllUsers();

  const navigate = useNavigate();

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
        <WrapItem key={user.id} mx="auto">
          <UserCard imageUrl={user.iconUrl || ""} username={user.username} onClick={() => navigate(`/home/user_management/${user.id}`, {
            state: { username: user.username},
          })
          } />
        </WrapItem>
      ))}
    </Wrap>
  );
});