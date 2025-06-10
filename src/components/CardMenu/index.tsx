import { Badge, Box, Button, Card, HStack } from "@chakra-ui/react"

export const CardMenu = () => (
  <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
    <Box>
      <Card.Body>
        <Card.Title mb="2">The perfect latte</Card.Title>
        <Card.Description>
          Caffè latte is a coffee beverage of Italian origin made with espresso
          and steamed milk.
        </Card.Description>
        <HStack mt="4">
          <Badge>Hot</Badge>
          <Badge>Caffeine</Badge>
        </HStack>
      </Card.Body>
      <Card.Footer>
        <Button>Buy Latte</Button>
      </Card.Footer>
    </Box>
  </Card.Root>
)
