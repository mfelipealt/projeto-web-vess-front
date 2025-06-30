
import { Box, Button, Center, Flex, Heading, Icon, SimpleGrid, VStack } from "@chakra-ui/react";
import { CardMenu } from "../../components/CardMenu";
import { 
  FaTools,  
  FaClipboardList, 
  FaFileSignature, 
  FaChartLine, 
  FaCog, 
  FaBook,
  FaHistory,
  FaQuestionCircle,
  FaMap,
  FaShare
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function HomePage() {

  const navigate = useNavigate()

  const handleClick = () => {
    const startTime = new Date().toISOString();
    localStorage.setItem("startTime", startTime);
    navigate("/avaliacoes");
  };

  const evaluationProcessCards = [
    { icon: <FaTools size="1.5em" />, title: "Equipamentos", path: "/decisao" },
    { icon: <FaMap size="1.5em" />, title: "Onde\nAmostrar", path: "/decisao" },
    { icon: <FaClipboardList size="1.5em" />, title: "Quando\nAmostrar", path: "/decisao" },
    { icon: <FaFileSignature size="1.5em" />, title: "Extração da Amostra", path: "/decisao" },
    { icon: <FaChartLine size="1.5em" />, title: "Fragmentação\nAmostra", path: "/decisao" },
    { icon: <FaCog size="1.5em" />, title: "Escores VESS", path: "/decisao" },
  ];

  const extraCards = [
    { icon: <FaBook size="1.5em" />, title: "Decisão Manejo", path: "/decisao" },
    { icon: <FaHistory size="1.5em" />, title: "Informações Complementares", path: "/decisao" },
    { icon: <FaQuestionCircle size="1.5em" />, title: "O que é o VESS", path: "/decisao" },
    { icon: <FaBook size="1.5em" />, title: "Minhas\nAvaliações", path: "/historico-avaliacoes" },
    { icon: <FaHistory size="1.5em" />, title: "Sobre o APP", path: "/decisao" },
    { icon: <FaQuestionCircle size="1.5em" />, title: "Configurações", path: "/configuracoes" },
  ];

  return (
    <Box p={{ base: 4, md: 8 }}>
      <VStack align="stretch">
        <Heading as="h1" textAlign="center" size="2xl" color="teal.600">
          VESS
        </Heading>

        <Center>
          <Button colorScheme="teal" size="lg" w={{ base: "100%", md: "auto" }} onClick={handleClick}>
            Avaliar
          </Button>
        </Center>

        <Flex
          // Em telas pequenas (base), usamos 'column' (um abaixo do outro)
          // Em telas grandes (lg), usamos 'row' (lado a lado)
          direction={{ base: "column", md: "column", lg: "row" }}
          gap={8} // Espaçamento entre as duas seções
        >
          <Box flex={1}>
            <Heading as="h2" size="lg" textAlign="center" my={{ base: 4, md: 4, lg: 10}}>
              Processo de Avaliação
            </Heading>
            <SimpleGrid
              // Em telas pequenas, 2 colunas. Em telas grandes, 3 colunas.
              columns={{ base: 2, md: 3, lg: 3}}
            >
              {evaluationProcessCards.map((card, index) => (
                <CardMenu key={index} icon={card.icon} title={card.title} navigateTo={card.path} />
              ))}
            </SimpleGrid>
          </Box>

          <Box flex={1}>
            <Heading as="h2" size="lg" textAlign="center" my={{lg: 10}} mb={{base: 4, md: 4}}>
              Extras
            </Heading>
            <SimpleGrid
              columns={{ base: 2, md: 3, lg: 3}}
            >
              {extraCards.map((card, index) => (
                <CardMenu key={index} icon={card.icon} title={card.title} navigateTo={card.path} />
              ))}
            </SimpleGrid>
          </Box>
        </Flex>

        <Center>
          <Icon bg="teal.500" color="black" backgroundColor={"white"} size="lg" my={{ base: 4, md: 4, lg: 10}}>
                    <FaShare/>
                  </Icon>
        </Center>
      </VStack>
    </Box>
  );
}