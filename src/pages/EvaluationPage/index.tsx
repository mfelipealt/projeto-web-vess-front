
import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { InputComponent } from "../../components/InputComponent";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserConfig } from "../../contexts/UserConfigContext";

export function EvaluationPage() {

  const evaluationProcessInputs = [
    { name: "nmr-amostra", label: "Nº Amostra:", placeholder: "" },
    { name: "local-propriedade", label: "Local/propriedade (GPS)::", placeholder: "" },
    { name: "avaliador", label: "Avaliador:", placeholder: "" },
    { name: "comprimento-camada-1", label: "Comprimento camada 1:", placeholder: "" },
    { name: "nota-camada-1", label: "Nota camada 1:", placeholder: "" },
    { name: "comprimento-camada-1", label: "Comprimento camada 2:", placeholder: "" },
    { name: "nota-camada-1", label: "Nota camada 2:", placeholder: "" },
    { name: "comprimento-camada-1", label: "Comprimento camada 3:", placeholder: "" },
    { name: "nota-camada-1", label: "Nota camada 3:", placeholder: "" },
    { name: "comprimento-camada-1", label: "Comprimento camada 4:", placeholder: "" },
    { name: "nota-camada-1", label: "Nota camada 4:", placeholder: "" },
    { name: "comprimento-camada-1", label: "Comprimento camada 5:", placeholder: "" },
    { name: "nota-camada-1", label: "Nota camada 5:", placeholder: "" },
  ];


  const { formData, setFormData } = useUserConfig();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleClick = () => {
    
  };

  return (
    <Stack
      p={6}
      minH="100vh"
      direction={{ base: "column", md: "column", lg: "row" }}
      alignItems="center" 
      justifyContent="center" 
      spaceX={8} 
    >
      <Heading as="h1" textAlign="center" size="2xl" color="teal.600" w={{lg: "30%"}}>
        AVALIAÇÕES
      </Heading>

      <Flex direction={"column"} w={{ base: "100%", md: "80%", lg: "60%" }}>
        <InputComponent
            key={""}
            name={"nmr-amostra" as keyof typeof formData}
            label={"Nº Amostra"}
            placeholder={""}
            value={formData["nmr-amostra" as keyof typeof formData]}
            onChange={handleInputChange}
          />

          <Text>Quantas camadas de solo deseja avaliar?</Text>
          <Text>1   -   2   -   3   -   4   -   5</Text>
      </Flex>

      <Flex direction={"column"} w={{ base: "100%", md: "80%", lg: "60%" }}>
        {evaluationProcessInputs.map((input, index) => (
          <InputComponent
            key={index}
            name={input.name as keyof typeof formData}
            label={input.label}
            placeholder={input.placeholder}
            value={formData[input.name as keyof typeof formData]}
            onChange={handleInputChange}
          />
        ))}
      </Flex>

      <Flex direction={"column"} w={{ base: "100%", md: "80%", lg: "60%" }}>
        <Text>Anexar Foto</Text>
        <InputComponent
            key={""}
            name={"infosImportantes" as keyof typeof formData}
            label={"Outras informações importantes:"}
            placeholder={""}
            value={formData["infosImportantes" as keyof typeof formData]}
            onChange={handleInputChange}
          />
      </Flex>

      <Flex py={6} px={3}>
          <Button 
            size="lg" 
            w={{ base: "100%", md: "100%", lg: "100%" }} 
            onClick={handleClick} 
            transition="all 0.2s ease-in-out"
            >
            Avaliar
          </Button>
        </Flex>
    </Stack>
  );
}