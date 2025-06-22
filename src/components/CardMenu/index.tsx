import { Card, Center, Heading, Icon } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type CardMenuProps = {
  title: string;
  icon: ReactElement; 
  navigateTo?: string;
};

export const CardMenu = ({ icon, title, navigateTo }: CardMenuProps) => {
  
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <Card.Root
      as="button" 
      onClick={handleClick} 
      _hover={{ bg: "gray.100", transform: "scale(1.03)" }} 
      transition="all 0.2s ease-in-out"
      my={3}
      mx={3}
    >
      <Card.Body>
        <Center flexDirection="column" textAlign="center">
          <Icon bg="teal.500" color="black" backgroundColor={"white"} size="lg">
            {icon}
          </Icon>
          <Heading 
            fontSize={{ base: "1rem", md: "1.3rem", lg: "1.5rem" }}  
            mt="3" 
            fontWeight="medium"
            style={{ whiteSpace: 'pre-line' }}
          >
            {title}
          </Heading>
        </Center>
      </Card.Body>
    </Card.Root>
  );
};