import { Button } from "@chakra-ui/react";
import { FC, memo } from "react"

type Props = {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

export const PrimaryButton: FC<Props> = memo((props) => {
    const { children, disabled, onClick } = props;
  return (
   <Button bg="teal.400" color="white" _hover={{ opacity: 0.8 }} disabled={disabled} onClick={onClick}>
    {children}
    </Button>
  )
});