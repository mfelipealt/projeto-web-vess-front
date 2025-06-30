
import { Box, Button, Center, Flex, Heading, Icon, SimpleGrid, Text, Tooltip, VStack } from "@chakra-ui/react";
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
import { useClearEvaluationsOnMount } from "../../hooks/useClearEvaluationsOnMount";
import { useEffect, useState } from "react";
import { useUserConfig } from "../../contexts/UserConfigContext";
import UserService from "../../service/UserService";

export function HomePage() {

  useClearEvaluationsOnMount();

  const navigate = useNavigate()
  const { formData: userConfig } = useUserConfig();
  const [isUserValid, setIsUserValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await UserService.find(userConfig.email);
        if (response && response.data) {
          setIsUserValid(true);
        } else {
          setIsUserValid(false);
        }
      } catch (error) {
        setIsUserValid(false);
        console.error("Erro ao verificar usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [userConfig.email]);

  const handleClick = () => {
    if (!isUserValid) return;
    const startTime = new Date().toISOString();
    localStorage.setItem("startTime", startTime);
    navigate("/avaliacoes");
  };

  const evaluationProcessCards = [
    { icon: <FaTools size="1.5em" />, title: "Equipamentos", path: "/info/equipamentos" },
    { icon: <FaMap size="1.5em" />, title: "Onde\nAmostrar", path: "/info/onde-amostrar" },
    { icon: <FaClipboardList size="1.5em" />, title: "Quando\nAmostrar", path: "/info/quando-amostrar" },
    { icon: <FaFileSignature size="1.5em" />, title: "Extração da Amostra", path: "/info/extracao-amostra" },
    { icon: <FaChartLine size="1.5em" />, title: "Fragmentação\nAmostra", path: "/info/fragmentacao-amostra" },
    { icon: <FaCog size="1.5em" />, title: "Escores VESS", path: "/qualidade-estrutural-vess" },
  ];

  const extraCards = [
    { icon: <FaBook size="1.5em" />, title: "Decisão Manejo", path: "/info/decisao-manejo" },
    { icon: <FaHistory size="1.5em" />, title: "Informações Complementares", path: "/info/informacoes-complementares" },
    { icon: <FaQuestionCircle size="1.5em" />, title: "O que é o VESS", path: "/info/oque-e-o-vess" },
    { icon: <FaBook size="1.5em" />, title: "Minhas\nAvaliações", path: "/historico-avaliacoes" },
    { icon: <FaHistory size="1.5em" />, title: "Sobre o APP", path: "/info/sobre-o-app" },
    { icon: <FaQuestionCircle size="1.5em" />, title: "Configurações", path: "/configuracoes" },
  ];

  return (
    <Box p={{ base: 4, md: 8 }}>
      <VStack align="stretch">
        <Heading as="h1" textAlign="center" size="2xl" color="teal.600">
          VESS
        </Heading>
        <Center>
          <Text>
            Bem vindo!
            Recomendamos a leitura de toda a aba “Processo de avaliação" antes do uso da aplicação.
          </Text>
        </Center>

        <Center>
          <Tooltip.Root
            disabled={isUserValid || isLoading}
          >
            <Button
              colorScheme="teal"
              size="lg"
              w={{ base: "100%", md: "auto" }}
              onClick={handleClick}
              disabled={!isUserValid || isLoading}              
            >
              {isLoading ? "Verificando..." : "Avaliar"}
            </Button>
          </Tooltip.Root>
        </Center>

        <Flex
          // Em telas pequenas (base), usamos 'column' (um abaixo do outro)
          // Em telas grandes (lg), usamos 'row' (lado a lado)
          direction={{ base: "column", md: "column", lg: "row" }}
          gap={8}
        >
          <Box flex={1}>
            <Heading as="h2" size="lg" textAlign="center" my={{ base: 4, md: 4, lg: 10 }}>
              Processo de Avaliação
            </Heading>
            <SimpleGrid
              // Em telas pequenas, 2 colunas. Em telas grandes, 3 colunas.
              columns={{ base: 2, md: 3, lg: 3 }}
            >
              {evaluationProcessCards.map((card, index) => (
                <CardMenu key={index} icon={card.icon} title={card.title} navigateTo={card.path} />
              ))}
            </SimpleGrid>
          </Box>

          <Box flex={1}>
            <Heading as="h2" size="lg" textAlign="center" my={{ lg: 10 }} mb={{ base: 4, md: 4 }}>
              Extras
            </Heading>
            <SimpleGrid
              columns={{ base: 2, md: 3, lg: 3 }}
            >
              {extraCards.map((card, index) => (
                <CardMenu key={index} icon={card.icon} title={card.title} navigateTo={card.path} />
              ))}
            </SimpleGrid>
          </Box>
        </Flex>

        <Center>
          <Icon bg="teal.500" color="black" backgroundColor={"white"} size="lg" my={{ base: 4, md: 4, lg: 10 }}>
            <FaShare />
          </Icon>
        </Center>
      </VStack>
    </Box>
  );
}