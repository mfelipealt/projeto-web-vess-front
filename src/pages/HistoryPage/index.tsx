import { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    VStack,
    Text,
    Accordion,
    Image,
    Span,
    Card
} from '@chakra-ui/react';
import { useUserConfig } from '../../contexts/UserConfigContext';
import AssessmentService from '../../service/AssessmentService';
import { IAssessmentResponse } from '../../commons/interface';
import { api } from '../../lib/axiios';
import { useClearEvaluationsOnMount } from '../../hooks/useClearEvaluationsOnMount';

export function HistoryPage() {
    const { formData: userConfig } = useUserConfig();
    const [history, setHistory] = useState<IAssessmentResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useClearEvaluationsOnMount();
    
    useEffect(() => {
        const fetchHistory = async () => {
            if (userConfig.email && userConfig.nome) {
                try {
                    setLoading(true);
                    const response = await AssessmentService.userHistory(userConfig.email, userConfig.nome);
                    if (response && response.data) {
                        setHistory(response.data);
                    }
                } catch (err) {
                    setError('Não foi possível carregar o histórico. Tente novamente mais tarde.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                setError('Informações de usuário não encontradas. Por favor, configure seu perfil.');
            }
        };

        fetchHistory();
    }, [userConfig.email, userConfig.nome]);

    if (loading) { }
    if (error) { }

    return (
        <VStack as="main" p={{ base: 4, md: 8 }} spaceX={8} align="stretch" maxW="1200px" mx="auto">
            <Heading as="h1" textAlign="center" size="xl" color="teal.600">
                Histórico de Avaliações
            </Heading>

            {history.length === 0 ? (
                <Text textAlign="center">Nenhuma avaliação encontrada em seu histórico.</Text>
            ) : (
                <Accordion.Root collapsible>
                    {history.map((assessment) => (
                        <Accordion.Item key={assessment.id} value={assessment.id.toString()}>
                            <Accordion.ItemTrigger>
                                <Span flex='1' textAlign='left' fontWeight="bold">
                                    Avaliação de {new Date(assessment.dataFimAvaliacao).toLocaleDateString('pt-BR')}
                                    {' - '}
                                    Score Final: {assessment.scoreFinal.toFixed(2)}
                                </Span>
                                <Accordion.ItemIndicator />
                            </Accordion.ItemTrigger>

                            <Accordion.ItemContent>
                                <Accordion.ItemBody>
                                    <Box p={4} bg="gray.50">
                                        <Text whiteSpace="pre-wrap" mb={6} p={4} bg="white" borderRadius="md" shadow="sm">
                                            {assessment.resumoAvaliacao}
                                        </Text>

                                        <Heading as="h3" size="md" mb={4} color="gray.700">Amostras Coletadas</Heading>
                                        {assessment.amostrasAvaliacao.map(({ amostra }) => (
                                            <Card.Root key={amostra.id} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline' mb={4}>
                                                {amostra.imagemNomeArquivo && (
                                                    <Image
                                                        objectFit='cover'
                                                        maxW={{ base: '100%', sm: '200px' }}
                                                        src={`${api.defaults.baseURL}/samples/${amostra.id}/imagem`}
                                                        alt={`Imagem da amostra ${amostra.nomeAmostra}`}
                                                    />
                                                )}
                                                <Card.Body>
                                                    <Heading size='md'>Amostra: {amostra.nomeAmostra || 'Sem nome'}</Heading>
                                                    <Text py='2'>
                                                        <strong>Score da Amostra:</strong> {amostra.scoreAmostra.score.toFixed(2)}
                                                    </Text>
                                                    <Text py='2'>
                                                        <strong>Resumo:</strong> {amostra.scoreAmostra.resumoScoreAmostra || 'N/A'}
                                                    </Text>
                                                </Card.Body>
                                            </Card.Root>
                                        ))}
                                    </Box>
                                </Accordion.ItemBody>
                            </Accordion.ItemContent>
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
            )}
        </VStack>
    );
}