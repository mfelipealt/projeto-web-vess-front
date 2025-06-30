import { ContentItem } from '../components/InfoPage';
import { aboutAppData } from './aboutAppData';
import { additionalInformationData } from './additionalInformationData';
import { equipmentsData } from './equipmentsData';
import { managementDecisionData } from './managementDecisionData';
import { sampleExtractionData } from './sampleExtractionData';
import { sampleFragmentationData } from './sampleFragmentationData';
import { whatIsVessData } from './whatIsVessData';
import { whenSampleData } from './whenSample';
import { whereSampleData } from './whereSampleData';

type InfoPageData = {
  pageTitle: string;
  content: ContentItem[];
};

export const infoPageDataMap: Record<string, InfoPageData> = {
  'equipamentos': {
    pageTitle: 'Equipamentos',
    content: equipmentsData,
  },
  'onde-amostrar': {
    pageTitle: 'Onde Amostrar',
    content: whereSampleData,
  },
  'quando-amostrar': {
    pageTitle: 'Quando Amostrar',
    content: whenSampleData,
  },
  'extracao-amostra': {
    pageTitle: 'Extração da Amostra',
    content: sampleExtractionData,
  },
  'fragmentacao-amostra': {
    pageTitle: 'Fragmentação da Amostra',
    content: sampleFragmentationData,
  },
  'oque-e-o-vess': {
    pageTitle: 'O que é o VESS',
    content: whatIsVessData,
  },
  'sobre-o-app': {
    pageTitle: 'Sobre o App',
    content: aboutAppData,
  },
  'informacoes-complementares': {
    pageTitle: 'Informações Complementares',
    content: additionalInformationData,
  },
  'decisao-manejo': {
    pageTitle: 'Decisão de Manejo',
    content: managementDecisionData,
  },
};