
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { InputComponent } from "../../components/InputComponent";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserConfig } from "../../contexts/UserConfigContext";

export function ConfigPage() {

  const evaluationProcessInputs = [
    { name: "nome", label: "Nome:", placeholder: "" },
    { name: "email", label: "E-mail:", placeholder: "eu@exemplo.com" },
    { name: "pais", label: "País:", placeholder: "" },
    { name: "endereco", label: "Endereço:", placeholder: "Cidade - Estado" },
    { name: "idioma", label: "Idioma:", placeholder: "" },
  ];

  useEffect(() => {
    const savedData = localStorage.getItem('userConfig');
    
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error("Erro ao ler os dados de configuração do localStorage", error);
      }
    }
  }, []); 

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
    navigate("/termos-condicoes");
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
        CONFIGURAÇÕES
      </Heading>
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
        <Flex py={6} px={3}>
          <Button 
            size="lg" 
            w={{ base: "100%", md: "100%", lg: "100%" }} 
            onClick={handleClick} 
            transition="all 0.2s ease-in-out"
            >
            Avançar para Termos e condições de uso
          </Button>
        </Flex>
      </Flex>
    </Stack>
  );
}