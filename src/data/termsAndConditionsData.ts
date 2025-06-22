import { ContentItem } from "../components/InfoPage";

export const termsAndConditionsData: ContentItem[] = [
  {
    type: 'paragraph',
    spans: [
      { text: 'O presente termo e condições de uso visa ' },
      { text: 'utilização dos USUÁRIOS ao Aplicativo VESS. ', bold: true, underline: true },
      { text: 'Ao acessar o Aplicativo VESS, o USUÁRIO expressamente aceita e concorda com as disposições destes Termos e Condições de Uso.' },
    ],
  },
  {
    type: 'heading',
    text: 'DO OBJETIVO',
  },
  {
    type: 'paragraph',
    spans: [
      { text: 'Este aplicativo é uma ferramenta ' },
      { text: 'gratuita de uso, ', bold: true, underline: true },
      { text: 'desenvolvido para fornecer aos agricultores, pesquisadores e profissionais da área agrícola uma ' },
      { text: 'avaliação prática, acessível e de baixo custo para avaliar a qualidade da estrutura do solo.', bold: true, underline: true },
      { text: 'O aplicativo permite que os usuários concluam uma autoavaliação sobre suas práticas agrícolas a partir da qualidade estrutural do solo obtida, sugerindo melhorias nas práticas de manejo e contribuindo para melhorar a sustentabilidade em suas ações de manejo do solo.' },
    ],
  },
  {
    type: 'heading',
    text: 'COMUNICAÇÕES',
  },
  {
    type: 'paragraph',
    spans: [
        { text: 'O aplicativo VESS disponibiliza o endereço de e-mail rachelguimaraes@utfpr.edu.br como o Canal de Atendimento para receber as comunicações do USUÁRIO.',}
    ],
  },
  {
    type: 'heading',
    text: 'COMPARTILHAMENTO DE DADOS COM OS DESENVOLVEDORES',
  },
  {
    type: 'paragraph',
    spans: [
      { text: 'Os desenvolvedores do aplicativo têm como princípio da atuação o respeito ao USUÁRIO, agindo sempre em conformidade com as disposições do Marco Civil da Internet (Lei Federal n. 12965/14) e com a Lei Geral de Proteção de Dados Pessoais (Lei 13.709/18). Ao compartilhar os resultados das avaliações com os desenvolvedores você possibilita que mais pesquisas e melhorias no aplicativo sejam realizadas. Dados pessoais como nome, E-mail e coordenadas de localização não serão divulgados). O aplicativo pode ser acessado por qualquer dispositivo móvel conectado ou não à Internet, independentemente de localização geográfica. Em vista das diferenças que podem existir entre as legislações locais e nacionais, ao acessar o aplicativo, o USUÁRIO concorda que a legislação aplicável para fins destes Termos e Condições de Uso será aquela vigente na República Federativa do Brasil.',}
    ],
  },
];