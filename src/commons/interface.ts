
export interface IUser {
    nome: string;
    email: string;
    pais: ICountry;
    endereco: string;
    idioma: ILanguage;
}

export interface ICountry {
    nome: string;
    tipo: string;
}

export interface ILanguage {
    nome: string;
    tipo: string;
}

export interface IAssessments {
    // local-propriedade
    localAmostra: string;
    // averageVessScore
    scoreFinal: number;
    // decisao-manejo-resumo-avaliacao
    decisaoManejoAvaliacao: string;
    // resumo-avaliacao-resumo-avaliacao
    resumoAvaliacao: string;
    // starTime
    dataInicioAvaliacao: Date;
    // end
    dataFimAvaliacao: Date;
    // duracaoTimeStamp
    tempoDeAvaliacao: number;
    amostras: ISamples[];    
}

export interface ISamples {
    // nmr-amostra
    nomeAmostra: string;
    // qtd-camadas
    qtdCamadasAmostra: number;
    // enviar 'string'
    contentImageAmostra: string;
    // enviar 'string'
    typeImageAmostra: string;
    // infos-importantes-amostra
    outrasInformacoesAmostra: string;
    scoreAmostra: ISampleScore;    
    camadas: ILayers[];    
}

export interface ILayers {
    // comprimento-camada-x
    comprimento: number;
    // nota-camada-x
    nota: number;
}

export interface ISampleScore {
    // vess-score-resumo-amostra
    score: number;
    // decisao-manejo-resumo-amostra
    decisaoManejoScoreAmostra: string;
    // resumo-avaliacao-resumo-amostra
    resumoScoreAmostra: string;
    // outras-infos-importantes-resumo-amostra
    infoScoreAmostra: string;
}

export interface IAssessmentResponse {
    id: number;
    usuario: IUserResponse;
    localAmostra: string;
    scoreFinal: number;
    decisaoManejoAvaliacao: string;
    resumoAvaliacao: string;
    dataInicioAvaliacao: Date;
    dataFimAvaliacao: Date;
    tempoDeAvaliacao: number;
    amostrasAvaliacao: IAmostraAvaliacao[];
}

export interface IUserResponse {
    id: number;
    nome: string;
    email: string;
    pais: ICountry & { id: number }; // Adiciona o ID ao tipo existente
    endereco: string;
    idioma: ILanguage & { id: number }; // Adiciona o ID ao tipo existente
}

export interface IAmostraAvaliacao {
    id: number;
    amostra: IAmostraResponse;
}

export interface IAmostraResponse {
    id: number;
    nomeAmostra: string;
    qtdCamadasAmostra: number;
    imagemNomeArquivo: string; // O nome do arquivo salvo no Minio
    outrasInformacoesAmostra: string;
    scoreAmostra: ISampleScoreResponse;
    camadas: ILayerResponse[];
}

export interface ISampleScoreResponse {
    id: number;
    score: number;
    decisaoManejoScoreAmostra: string;
    resumoScoreAmostra: string;
    infoScoreAmostra: string;
}

export interface ILayerResponse {
    id: number;
    comprimento: number;
    nota: number;
}