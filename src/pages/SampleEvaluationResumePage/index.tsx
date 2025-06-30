
import { Button, Card, Center, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { TextAreaComponent } from "../../components/TextAreaComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SampleEvaluationResumePage() {

    const [formData, setFormData] = useState({
        "decisao-manejo-resumo-amostra": "",
        "resumo-avaliacao-resumo-amostra": "",
        "outras-infos-importantes-resumo-amostra": "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const raw = localStorage.getItem("userEvaluations");
        if (!raw) return;

        const evaluations = JSON.parse(raw);
        const last = evaluations[evaluations.length - 1];
        if (!last || !last.data) return;

        const data = last.data;
        let resumo = "";

        for (let i = 1; i <= 5; i++) {
            const comprimento = data[`comprimento-camada-${i}`];
            const nota = data[`nota-camada-${i}`];

            if (comprimento || nota) {
                resumo += `Comprimento Camada ${i}: ${comprimento || "-"} cm; Nota ${i}: ${nota || "-"}\n`;
            }
        }

        setFormData(prev => ({
            ...prev,
            "resumo-avaliacao-resumo-amostra": resumo.trim()
        }));
    }, []);

    const [vessScore, setVessScore] = useState<number | null>(null);

    useEffect(() => {
        // Buscar a última avaliação salva
        const evaluationsRaw = localStorage.getItem('userEvaluations');
        if (evaluationsRaw) {
            const evaluations = JSON.parse(evaluationsRaw);
            const last = evaluations[evaluations.length - 1];
            if (last && last.data) {
                const layers = [1, 2, 3, 4, 5];
                let totalDepth = 0;
                let weightedSum = 0;

                layers.forEach(layer => {
                    const comprimento = parseFloat(last.data[`comprimento-camada-${layer}`]);
                    const nota = parseFloat(last.data[`nota-camada-${layer}`]);

                    if (!isNaN(comprimento) && !isNaN(nota)) {
                        totalDepth += comprimento;
                        weightedSum += comprimento * nota;
                    }
                });

                if (totalDepth > 0) {
                    const score = +(weightedSum / totalDepth).toFixed(2);
                    setVessScore(score);

                    // Salva o score no objeto de avaliação
                    last.data["vess-score-resumo-amostra"] = score;
                    evaluations[evaluations.length - 1] = last;
                    localStorage.setItem("userEvaluations", JSON.stringify(evaluations));
                }
            }
        }
    }, []);

    const saveExtraData = () => {
        const raw = localStorage.getItem("userEvaluations");
        if (!raw) return;

        const evaluations = JSON.parse(raw);
        const last = evaluations[evaluations.length - 1];
        if (!last || !last.data) return;

        last.data["decisao-manejo-resumo-amostra"] = formData["decisao-manejo-resumo-amostra"];
        last.data["resumo-avaliacao-resumo-amostra"] = formData["resumo-avaliacao-resumo-amostra"];
        last.data["outras-infos-importantes-resumo-amostra"] = formData["outras-infos-importantes-resumo-amostra"];

        evaluations[evaluations.length - 1] = last;
        localStorage.setItem("userEvaluations", JSON.stringify(evaluations));
    };

    const handleSaveAndNext = () => {
        saveExtraData();
        navigate("/avaliacoes");
    };

    const handleFinalize = () => {
        saveExtraData();
        navigate("/resumo-avaliacoes-local");
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <VStack spaceX={6} spaceY={6} p={{ base: 4, md: 8 }} align="stretch" maxW="80%" mx="auto">

            <Heading as="h1" textAlign="center" size="xl" color="teal.600">
                AVALIAÇÕES
            </Heading>

            <Center flexDirection="column" textAlign="center"><Text>Escore Qe-VESS da amostra X:</Text> </Center>

            <Card.Root>
                <Card.Body>
                    <Center flexDirection="column" textAlign="center">
                        <Heading fontSize={{ base: "1rem", md: "1.3rem", lg: "1.5rem" }} mt="3" fontWeight="medium">
                            {vessScore ?? "N/A"}
                        </Heading>
                    </Center>
                </Card.Body>
            </Card.Root>

            <TextAreaComponent
                key={""}
                name={"decisao-manejo-resumo-amostra" as keyof typeof formData}
                label={"Decisão de manejo:"}
                placeholder={""}
                value={formData["decisao-manejo-resumo-amostra" as keyof typeof formData]}
                onChange={handleTextAreaChange}
            />

            <TextAreaComponent
                key={""}
                name={"resumo-avaliacao-resumo-amostra" as keyof typeof formData}
                label={"Resumo da avaliação:"}
                placeholder={""}
                value={formData["resumo-avaliacao-resumo-amostra" as keyof typeof formData]}
                onChange={handleTextAreaChange}
            />

            <TextAreaComponent
                key={""}
                name={"outras-infos-importantes-resumo-amostra" as keyof typeof formData}
                label={"Outras informações importantes:"}
                placeholder={""}
                value={formData["outras-infos-importantes-resumo-amostra" as keyof typeof formData]}
                onChange={handleTextAreaChange}
            />

            <Stack
                direction={{ base: 'column', md: 'column', lg: "row" }} // 👈 A mágica acontece aqui!
                spaceX={4}
                pt={6}
                maxW={{ base: "100%", md: "100%", lg: "48%" }}
            >
                <Button
                    size="lg"
                    w={"100%"}
                    onClick={handleFinalize}
                    transition="all 0.2s ease-in-out"
                    ml={4}
                >
                    FINALIZAR
                </Button>

                <Button
                    size="lg"
                    w={"100%"}
                    onClick={handleSaveAndNext}
                    transition="all 0.2s ease-in-out"
                >
                    PRÓXIMA AMOSTRA
                </Button>
            </Stack>

        </VStack>
    );
}