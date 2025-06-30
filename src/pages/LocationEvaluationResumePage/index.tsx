
import { Button, Card, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { TextAreaComponent } from "../../components/TextAreaComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAssessments, ISamples } from "../../commons/interface";
import { useUserConfig } from "../../contexts/UserConfigContext";
import AssessmentService from "../../service/AssessmentService";


export function LocationEvaluationResumePage() {

    const { formData: userConfig } = useUserConfig(); 
    const [localEvaluations, setLocalEvaluations] = useState([]);
    const [averageVessScore, setAverageVessScore] = useState<number | null>(null);


    const [formData, setFormData] = useState({
        "decisao-manejo-resumo-avaliacao": "",
        "resumo-avaliacao-resumo-avaliacao": ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const rawData = localStorage.getItem("userEvaluations"); 
        if (!rawData) return;

        const evaluations = JSON.parse(rawData);
        setLocalEvaluations(evaluations);

        const scores = evaluations
            .map((item: any) => parseFloat(item?.data?.["vess-score-resumo-amostra"]))
            .filter((score: number) => !isNaN(score));

        if (scores.length > 0) {
            const avg = scores.reduce((acc: number, score: number) => acc + score, 0) / scores.length;
            setAverageVessScore(Number(avg.toFixed(2)));
        }
    }, []);


    let duracaoTimeStamp = 0
    let startTime = localStorage.getItem("startTime");

    const handleSave = async () => {
        if (!userConfig || !userConfig.email) return;

        const rawData = localStorage.getItem("userEvaluations");
        const userEvaluations = rawData ? JSON.parse(rawData) : [];

        const dataInicio = startTime
            ? new Date(Number(startTime))
            : new Date(userEvaluations[0].createdAt);

        const dataFim = new Date();
        const tempoDeAvaliacao = dataFim.getTime() - dataInicio.getTime();

        const amostrasPayload: ISamples[] = userEvaluations.map((ev: any) => ({
            nomeAmostra: ev.data["nmr-amostra"] || "",
            qtdCamadasAmostra: ev.data["qtdCamadas"] || 0,
            contentImageAmostra: ev.data["contentImageAmostra"] || "string",  
            typeImageAmostra: ev.data["typeImageAmostra"] || "string",      
            outrasInformacoesAmostra: ev.data["infos-importantes-amostra"] || "",
            scoreAmostra: {
                score: parseFloat(ev.data["vess-score-resumo-amostra"]) || 0,
                decisaoManejoScoreAmostra: ev.data["decisao-manejo-resumo-amostra"] || "",
                resumoScoreAmostra: ev.data["resumo-avaliacao-resumo-amostra"] || "",
                infoScoreAmostra: ev.data["outras-infos-importantes-resumo-amostra"] || "",
            },
            camadas: Array.from({ length: ev.data["qtdCamadas"] || 0 }, (_, i) => ({
                comprimento: parseFloat(ev.data[`comprimento-camada-${i + 1}`]) || 0,
                nota: parseFloat(ev.data[`nota-camada-${i + 1}`]) || 0,
            })),
        }));

        const finalPayload: IAssessments = {
            localAmostra: userEvaluations[0]?.data["local-propriedade"] || "",
            scoreFinal: averageVessScore || 0,
            decisaoManejoAvaliacao: formData["decisao-manejo-resumo-avaliacao"],
            resumoAvaliacao: formData["resumo-avaliacao-resumo-avaliacao"],
            dataInicioAvaliacao: dataInicio,
            dataFimAvaliacao: dataFim,
            tempoDeAvaliacao: tempoDeAvaliacao,
            amostras: amostrasPayload
        };

        try {
            await AssessmentService.save(finalPayload, userConfig.email);
            localStorage.removeItem("userEvaluations");
            navigate("/");
        } catch (error) {
            console.error("Erro ao enviar avaliação:", error);
        }
    };


    useEffect(() => {
        const raw = localStorage.getItem("userEvaluations");
        if (!raw) return;

        const evaluations = JSON.parse(raw);
        const qtdAmostras = evaluations.length;
        const ultimaAvaliacao = evaluations[qtdAmostras - 1];

        const avaliador = ultimaAvaliacao?.data?.avaliador || "-";


        let duration = "Duração desconhecida";

        if (startTime) {
            const start = new Date(startTime);
            const end = new Date();
            const diffMs = end.getTime() - start.getTime();
            duracaoTimeStamp = diffMs
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
            "resumo-avaliacao-resumo-avaliacao": resumo
        }));
    }, []);

    useEffect(() => {
        const rawData = localStorage.getItem("userEvaluations");
        if (rawData) {
            const evaluations = JSON.parse(rawData);
            const scores = evaluations
                .map((item: any) => parseFloat(item?.data?.["vess-score-resumo-amostra"]))
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
                name="decisao-manejo-resumo-avaliacao"
                label={"Decisão de manejo para o local:"}
                placeholder={""}
                value={formData["decisao-manejo-resumo-avaliacao"]}
                onChange={handleTextAreaChange}
            />

            <TextAreaComponent
                name="resumo-avaliacao-resumo-avaliacao"
                label={"Resumo da avaliação:"}
                placeholder={""}
                value={formData["resumo-avaliacao-resumo-avaliacao"]}
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