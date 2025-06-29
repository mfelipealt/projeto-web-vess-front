
import { Button, Card, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { TextAreaComponent } from "../../components/TextAreaComponent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function LocationEvaluationResumePage() {

    const [formData, setFormData] = useState({
        "decisao-manejo": "",
        "resumo-avaliacao": "",
        "outras-infos-importantes": "",
    });

    const navigate = useNavigate();

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
            
            <Card.Root >
                <Card.Body >
                    <Center flexDirection="column" textAlign="center">
                        <Heading
                            fontSize={{ base: "1rem", md: "1.3rem", lg: "1.5rem" }}
                            mt="3"
                            fontWeight="medium"
                            style={{ whiteSpace: 'pre-line' }}
                            
                        >
                            "3.1"
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
                onClick={() => navigate("/")}
                transition="all 0.2s ease-in-out"
                ml={4}
            >
                SALVAR
            </Button>
        </VStack>
    );
}