
import { Button, ButtonGroup, FileUpload, Flex, Heading, IconButton, Stack, Text, Float, useFileUploadContext } from "@chakra-ui/react";
import { InputComponent } from "../../components/InputComponent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TextAreaComponent } from "../../components/TextAreaComponent";
import {
    FaCamera
} from "react-icons/fa";
import { LuFileImage, LuX } from "react-icons/lu"
import { toaster } from "../../components/ui/toaster";


export function EvaluationPage() {

    const initialEvaluationData = {
        "nmr-amostra": "",
        "comprimento-camada-1": "",
        "nota-camada-1": "",
        "comprimento-camada-2": "",
        "nota-camada-2": "",
        "comprimento-camada-3": "",
        "nota-camada-3": "",
        "comprimento-camada-4": "",
        "nota-camada-4": "",
        "comprimento-camada-5": "",
        "nota-camada-5": "",
        "local-propriedade": "",
        "avaliador": "",
        "infos-importantes-amostra": "",
        "qtdCamadas": "1",
        "contentImageAmostra": "",
        "typeImageAmostra": "",
    };

    const evaluationProcessInputs = [
        { name: "local-propriedade", label: "Local/propriedade (GPS)::", placeholder: "" },
        { name: "avaliador", label: "Avaliador:", placeholder: "" },
    ];

    const allLayerInputs = [
        { name: "comprimento-camada-1", label: "Comprimento camada 1:", placeholder: "", layer: 1 },
        { name: "nota-camada-1", label: "Nota camada 1:", placeholder: "", layer: 1 },
        { name: "comprimento-camada-2", label: "Comprimento camada 2:", placeholder: "", layer: 2 },
        { name: "nota-camada-2", label: "Nota camada 2:", placeholder: "", layer: 2 },
        { name: "comprimento-camada-3", label: "Comprimento camada 3:", placeholder: "", layer: 3 },
        { name: "nota-camada-3", label: "Nota camada 3:", placeholder: "", layer: 3 },
        { name: "comprimento-camada-4", label: "Comprimento camada 4:", placeholder: "", layer: 4 },
        { name: "nota-camada-4", label: "Nota camada 4:", placeholder: "", layer: 4 },
        { name: "comprimento-camada-5", label: "Comprimento camada 5:", placeholder: "", layer: 5 },
        { name: "nota-camada-5", label: "Nota camada 5:", placeholder: "", layer: 5 },
    ];

    const [formData, setFormData] = useState(initialEvaluationData);
    const [isConvertingImage, setIsConvertingImage] = useState(false);

    const handleImageChange = (acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];

            const reader = new FileReader();

            reader.onloadstart = () => setIsConvertingImage(true);
            reader.onerror = () => {
                console.error("Erro ao ler o arquivo de imagem.");
                setIsConvertingImage(false);
            };

            reader.onload = () => {
                const base64String = reader.result as string;
                setFormData(prevData => ({
                    ...prevData,
                    contentImageAmostra: base64String,
                    typeImageAmostra: file.type,
                }));
                setIsConvertingImage(false);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const handleSaveAndEvaluate = () => {
        if (!formData['nmr-amostra'] || !formData['local-propriedade'] || !formData['avaliador'] || !formData['infos-importantes-amostra']) {
            toaster.error({
                title: "Campos obrigatórios",
                description: "Por favor, preencha o Nº da Amostra, Local/Propriedade, Avaliador e Outras Informações Importantes.",
            });
            return;
        }
        for (let i = 1; i <= visibleLayers; i++) {
            const comprimentoKey = `comprimento-camada-${i}` as keyof typeof formData;
            const notaKey = `nota-camada-${i}` as keyof typeof formData;

            if (!formData[comprimentoKey] || !formData[notaKey]) {
                toaster.error({
                    title: "Camadas incompletas",
                    description: `Por favor, preencha o comprimento e a nota para a Camada ${i}.`,
                });
                return;
            }
        }
        if (!formData.contentImageAmostra) {
            toaster.error({
                title: "Imagem não enviada",
                description: "Por favor, envie uma imagem da amostra.",
            });
            return;
        }
        try {
            const existingEvaluationsRaw = localStorage.getItem('userEvaluations');
            const existingEvaluations = existingEvaluationsRaw ? JSON.parse(existingEvaluationsRaw) : [];

            const newEvaluation = {
                id: Date.now(),
                createdAt: new Date().toISOString(),
                data: {
                    ...formData,
                    qtdCamadas: visibleLayers,
                },
            };

            existingEvaluations.push(newEvaluation);
            localStorage.setItem('userEvaluations', JSON.stringify(existingEvaluations));

            setFormData(initialEvaluationData);
            navigate("/resumo-avaliacoes-amostra");

        } catch (error) {
            console.error("Erro ao salvar avaliação:", error);
        }
    };

    useEffect(() => {
        const userConfigRaw = localStorage.getItem("userConfig");
        let nomeAvaliador = "";
        if (userConfigRaw) {
            try {
                const userConfig = JSON.parse(userConfigRaw);
                nomeAvaliador = userConfig.nome || "";
            } catch {
                nomeAvaliador = "";
            }
        }

        const existingEvaluationsRaw = localStorage.getItem('userEvaluations');
        if (existingEvaluationsRaw) {
            try {
                const existingEvaluations = JSON.parse(existingEvaluationsRaw);
                const lastEvaluation = existingEvaluations[existingEvaluations.length - 1];

                if (lastEvaluation && lastEvaluation.data) {
                    setFormData(prev => ({
                        ...prev,
                        "avaliador": lastEvaluation.data["avaliador"] || nomeAvaliador || "",
                        "local-propriedade": lastEvaluation.data["local-propriedade"] || "",
                    }));
                }
            } catch (error) {
                console.error("Erro ao carregar dados anteriores:", error);
            }
        } else {
            setFormData(prev => ({
                ...prev,
                "avaliador": nomeAvaliador,
            }));
        }
    }, []);

    const [visibleLayers, setVisibleLayers] = useState(1);

    const FileUploadList = () => {
        const fileUpload = useFileUploadContext()
        const files = fileUpload.acceptedFiles
        if (files.length === 0) return null
        return (
            <FileUpload.ItemGroup>
                {files.map((file) => (
                    <FileUpload.Item
                        w="auto"
                        boxSize="20"
                        p="2"
                        file={file}
                        key={file.name}
                    >
                        <FileUpload.ItemPreviewImage />
                        <Float placement="top-end">
                            <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
                                <LuX />
                            </FileUpload.ItemDeleteTrigger>
                        </Float>
                    </FileUpload.Item>
                ))}
            </FileUpload.ItemGroup>
        )
    }

    return (
        <Stack
            p={6}
            minH="100vh"
            direction={{ base: "column", md: "column", lg: "row" }}
            alignItems="center"
            justifyContent="center"
            spaceX={8}
        >
            <Flex direction={"column"} w={{ base: "100%", md: "80%", lg: "60%" }}>
                <Heading as="h1" textAlign="left" size="2xl" color="teal.600" pl={4}>
                    AVALIAÇÕES
                </Heading>

                <InputComponent
                    key={""}
                    name={"nmr-amostra" as keyof typeof formData}
                    label={"Nº Amostra"}
                    placeholder={""}
                    value={formData["nmr-amostra" as keyof typeof formData]}
                    onChange={handleInputChange}
                />
                <Stack textAlign={{ base: "center", md: "center", lg: "left" }} pl={{ base: 0, md: 0, lg: 4 }}>
                    <Text>Quantas camadas de solo deseja avaliar?</Text>
                    <ButtonGroup variant="subtle" justifyContent={{ base: "center", md: "center", lg: "left" }}>
                        {[1, 2, 3, 4, 5].map((number) => (
                            <Button
                                key={number}
                                onClick={() => setVisibleLayers(number)}
                                variant={visibleLayers === number ? 'solid' : 'outline'}
                                colorScheme={visibleLayers === number ? 'teal' : 'gray'}
                                rounded="full"
                            >
                                {number}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Stack>
                <Flex direction={"column"}>
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
            </Flex>

            <Flex direction={"column"} w={{ base: "100%", md: "80%", lg: "60%" }}>
                {allLayerInputs
                    .filter(input => input.layer <= visibleLayers)
                    .map((input, index) => (
                        <InputComponent
                            key={index}
                            name={input.name}
                            label={input.label}
                            placeholder={input.placeholder}
                            value={formData[input.name as keyof typeof formData]}
                            onChange={handleInputChange}
                        />
                    ))}
            </Flex>

            <Flex direction={"column"} w={{ base: "100%", md: "80%", lg: "60%" }}>
                <Stack>
                    <Text>Enviar Imagens</Text>
                    <FileUpload.Root accept="image/*" onFileChange={(details) => handleImageChange(details.acceptedFiles)}>
                        <FileUpload.HiddenInput />
                        <FileUpload.Trigger asChild ml={4}>
                            <IconButton aria-label="Call support" rounded="full">
                                <FaCamera />
                            </IconButton>
                        </FileUpload.Trigger>
                        <FileUploadList />
                    </FileUpload.Root>
                </Stack>

                <TextAreaComponent
                    key={""}
                    name={"infos-importantes-amostra" as keyof typeof formData}
                    label={"Outras informações importantes:"}
                    placeholder={""}
                    value={formData["infos-importantes-amostra" as keyof typeof formData]}
                    onChange={handleTextAreaChange}
                />
                <Flex py={6} px={3}>
                    <Button
                        size="lg"
                        w={{ base: "100%", md: "100%", lg: "100%" }}
                        onClick={handleSaveAndEvaluate}
                        transition="all 0.2s ease-in-out"
                    >
                        Avaliar
                    </Button>
                </Flex>
            </Flex>

        </Stack>
    );
}