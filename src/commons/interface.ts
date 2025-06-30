
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