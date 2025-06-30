import { useEffect } from 'react';

export const useClearEvaluationsOnMount = () => {
  useEffect(() => {
    try {
      console.log("Limpando 'userEvaluations' do localStorage via hook...");
      localStorage.removeItem('userEvaluations');
      localStorage.removeItem('startTime');
    } catch (error) {
      console.error('Erro ao limpar avaliações do localStorage:', error);
    }
  }, []); 
};