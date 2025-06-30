import { useState } from 'react';
import { Box, Button, CheckboxCard, VStack } from '@chakra-ui/react';
import { InfoPage } from '../../components/InfoPage';
import { termsAndConditionsData } from '../../data/termsAndConditionsData';
import { useNavigate } from 'react-router-dom';
import { useUserConfig } from '../../contexts/UserConfigContext';
import UserService from '../../service/UserService';
import { IUser } from '../../commons/interface';
import { useClearEvaluationsOnMount } from '../../hooks/useClearEvaluationsOnMount';

export const TermsAndConditionsPage = () => {

  const [checked, setChecked] = useState(false)
  const navigate = useNavigate();
  const { formData, setFormData } = useUserConfig();
  useClearEvaluationsOnMount();
  const handleConclude = async () => {
    if (!checked) return;
    if (!formData.nome || !formData.email || !formData.pais || !formData.idioma) {
      navigate('/configuracoes');
      return;
    }
    const payload: IUser = {
      nome: formData.nome,
      email: formData.email,
      endereco: formData.endereco,
      pais: formData.pais,           
      idioma: formData.idioma       
    };
    try {
      await UserService.save(payload);
      localStorage.setItem('userConfig', JSON.stringify(formData));
      navigate('/home');
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  return (

    <Box mr={4}>
      <InfoPage
        pageTitle="Termos e Condições de Uso"
        content={termsAndConditionsData}
      />

      <VStack spaceX={5} px={{ base: 4, md: 8 }} maxW="800px" mx="auto">
        <CheckboxCard.Root checked={checked} onCheckedChange={(e) => setChecked(!!e.checked)}>
          <CheckboxCard.HiddenInput />
          <CheckboxCard.Control>
            <CheckboxCard.Label>Li e concordo com os termos e condições de uso do aplicativo.</CheckboxCard.Label>
            <CheckboxCard.Indicator />
          </CheckboxCard.Control>
        </CheckboxCard.Root>
        <Button size="lg" w={{ base: "100%", md: "100%", lg: "100%" }} onClick={handleConclude} transition="all 0.2s ease-in-out" colorScheme="teal" disabled={!checked}> Concluir </Button>
      </VStack>
    </Box>
  );
};