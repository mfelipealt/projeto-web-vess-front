import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { InputComponent } from "../../components/InputComponent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserConfig } from "../../contexts/UserConfigContext";
import { Select, Portal, createListCollection } from "@chakra-ui/react";
import { ICountry, ILanguage } from "../../commons/interface";
import LanguageService from "../../service/LanguageService";
import CountryService from "../../service/CountriesService";
import { useClearEvaluationsOnMount } from "../../hooks/useClearEvaluationsOnMount";

type TextInputValueKeys = "nome" | "email" | "endereco";

export function ConfigPage() {

  const evaluationProcessInputs: { name: TextInputValueKeys; label: string; placeholder: string }[] = [
    { name: "nome", label: "Nome:", placeholder: "" },
    { name: "email", label: "E-mail:", placeholder: "eu@exemplo.com" },
    { name: "endereco", label: "Endereço:", placeholder: "Cidade - Estado" },
  ];

  const { formData, setFormData } = useUserConfig();
  const [paises, setPaises] = useState<ICountry[]>([]);
  const [idiomas, setIdiomas] = useState<ILanguage[]>([]);

  const [paisValue, setPaisValue] = useState<string[]>([]);
  const [idiomaValue, setIdiomaValue] = useState<string[]>([]);

  const navigate = useNavigate();

  useClearEvaluationsOnMount();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Buscando dados das APIs");
        const [paisesRes, idiomasRes] = await Promise.all([
          CountryService.findAll(),
          LanguageService.findAll(),
        ]);

        if (paisesRes && Array.isArray(paisesRes.data)) {
          setPaises(paisesRes.data);
        }
        if (idiomasRes && Array.isArray(idiomasRes.data)) {
          setIdiomas(idiomasRes.data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados de país/idioma:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Sincronizando selects com o formData do contexto");
    if (formData.pais) {
      setPaisValue([formData.pais.tipo]);
    }
    if (formData.idioma) {
      setIdiomaValue([formData.idioma.tipo]);
    }
  }, [formData.pais, formData.idioma]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaisChange = (details: { value: string[] }) => {
    const selectedValue = details.value[0];
    if (!selectedValue) {
      setPaisValue([]);
      setFormData(prev => ({ ...prev, pais: null }));
      return;
    }

    const selectedObject = paises.find(p => p.tipo === selectedValue);

    if (selectedObject) {
      setPaisValue(details.value);
      setFormData(prev => ({ ...prev, pais: selectedObject }));
    }
  };

  const handleIdiomaChange = (details: { value: string[] }) => {
    const selectedValue = details.value[0];
    if (!selectedValue) {
      setIdiomaValue([]);
      setFormData(prev => ({ ...prev, idioma: null }));
      return;
    }

    const selectedObject = idiomas.find(i => i.tipo === selectedValue);

    if (selectedObject) {
      setIdiomaValue(details.value);
      setFormData(prev => ({ ...prev, idioma: selectedObject }));
    }
  };

  const handleClick = () => {
    navigate("/termos-condicoes");
  };

  const paisCollection = createListCollection({ items: paises.map(p => ({ label: p.nome, value: p.tipo })) });
  const idiomaCollection = createListCollection({ items: idiomas.map(i => ({ label: i.nome, value: i.tipo })) });


  return (
    <Stack
      p={6}
      minH="100vh"
      direction={{ base: "column", md: "column", lg: "row" }}
      alignItems="center"
      justifyContent="center"
      spaceX={8}
    >
      <Heading as="h1" textAlign="center" size="2xl" color="teal.600" w={{ lg: "30%" }}>
        CONFIGURAÇÕES
      </Heading>
      <Flex direction="column" w={{ base: "100%", md: "80%", lg: "60%" }}>
        {evaluationProcessInputs.map((input, index) => (
          <InputComponent
            key={input.name}
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
            value={formData[input.name] || ''}
            onChange={handleInputChange}
          />
        ))}

        <Select.Root
          collection={paisCollection}
          width="100%"
          value={paisValue}
          onValueChange={handlePaisChange}
        >
          <Select.HiddenSelect />
          <Select.Label>País</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Selecione o país" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {paisCollection.items.map(item => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>

        <Select.Root
          collection={idiomaCollection}
          width="100%"
          value={idiomaValue}
          onValueChange={handleIdiomaChange}
        >
          <Select.HiddenSelect />
          <Select.Label>Idioma</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Selecione o idioma" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {idiomaCollection.items.map(item => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>

        <Flex py={6} px={3}>
          <Button
            size="lg"
            w="100%"
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
