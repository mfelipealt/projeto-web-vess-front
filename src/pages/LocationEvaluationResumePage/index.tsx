
import { Button, Card, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { TextAreaComponent } from "../../components/TextAreaComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function LocationEvaluationResumePage() {

    const [formData, setFormData] = useState({
        "decisao-manejo": "",
        "resumo-avaliacao": "",
        "outras-infos-importantes": "",
    });

    const navigate = useNavigate();

    const [averageVessScore, setAverageVessScore] = useState<number | null>(null);

    useEffect(() => {
        const raw = localStorage.getItem("userEvaluations");
        if (!raw) return;

        const evaluations = JSON.parse(raw);
        const qtdAmostras = evaluations.length;
        const ultimaAvaliacao = evaluations[qtdAmostras - 1];

        const avaliador = ultimaAvaliacao?.data?.avaliador || "-";

        const startTime = localStorage.getItem("startTime");
        let duration = "Duração desconhecida";

        if (startTime) {
            const start = new Date(startTime);
            const end = new Date();
            const diffMs = end.getTime() - start.getTime();

            const diffSecsTotal = Math.floor(diffMs / 1000);
            const diffHrs = Math.floor(diffSecsTotal / 3600);
            const diffMins = Math.floor((diffSecsTotal % 3600) / 60);
            const diffSecs = diffSecsTotal % 60;

            duration = `${diffHrs} horas, ${diffMins} minutos e ${diffSecs} segundos`;
        }

        const resumo =
            `${qtdAmostras} amostras\n` +
            `Avaliador: ${avaliador}\n` +
            `Data das avaliações: ${new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}\n` +
            `Tempo total: ${duration}`;

        setFormData(prev => ({
            ...prev,
            "resumo-avaliacao": resumo
        }));
    }, []);

    useEffect(() => {
        const rawData = localStorage.getItem("userEvaluations");
        if (rawData) {
            const evaluations = JSON.parse(rawData);
            const scores = evaluations
                .map((item: any) => parseFloat(item?.data?.["vess-score"]))
                .filter((score: number) => !isNaN(score));

            if (scores.length > 0) {
                const avg = scores.reduce((acc: number, score: number) => acc + score, 0) / scores.length;
                setAverageVessScore(+avg.toFixed(2));
            }
        }
    }, []);

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        localStorage.removeItem("userEvaluations");
        navigate("/");
    };

    return (
        <VStack spaceX={6} spaceY={6} p={{ base: 4, md: 8 }} align="stretch" maxW="80%" mx="auto">

            <Heading as="h1" textAlign="center" size="xl" color="teal.600">
                AVALIAÇÕES
            </Heading>

            <Center flexDirection="column" textAlign="center"><Text>Escore Qe-VESS médio do local X:</Text> </Center>

            <Card.Root>
                <Card.Body>
                    <Center flexDirection="column" textAlign="center">
                        <Heading
                            fontSize={{ base: "1rem", md: "1.3rem", lg: "1.5rem" }}
                            mt="3"
                            fontWeight="medium"
                            style={{ whiteSpace: "pre-line" }}
                        >
                            {averageVessScore !== null ? averageVessScore : "N/A"}
                        </Heading>
                    </Center>
                </Card.Body>
            </Card.Root>

            <TextAreaComponent
                key={""}
                name={"decisao-manejo" as keyof typeof formData}
                label={"Decisão de manejo para o local:"}
                placeholder={""}
                value={formData["decisao-manejo" as keyof typeof formData]}
                onChange={handleTextAreaChange}
            />

            <TextAreaComponent
                key={""}
                name={"resumo-avaliacao" as keyof typeof formData}
                label={"Resumo da avaliação:"}
                placeholder={""}
                value={formData["resumo-avaliacao" as keyof typeof formData]}
                onChange={handleTextAreaChange}
            />

            <Button
                size="lg"
                w={"100%"}
                onClick={handleSave}
                transition="all 0.2s ease-in-out"
                ml={4}
            >
                SALVAR
            </Button>
        </VStack>
    );
}