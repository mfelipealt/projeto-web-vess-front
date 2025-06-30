import { IAssessments } from "../commons/interface";
import { api } from "../lib/axiios";

const URL = "/assessments"; 

export const save = async (payload: IAssessments, userEmail: string): Promise<any> => {
    let response;
    try {
        response = await api.post(`${URL}/save?email=${userEmail}`, payload);
    } catch (error: any) {
        console.error("Erro no serviço ao salvar avaliação:", error);
        response = error.response;
        throw error;
    }
    return response;
}

export const userHistory = async (userEmail: string, userName: string): Promise<any> => {
    let response;
    try {
        response = await api.get(`${URL}/history?email=${userEmail}&nome=${userName}`);
    } catch (error: any) {
        console.error("Erro no serviço ao buscar histórico:", error);
        response = error.response;
        throw error;
    }
    return response;
}

const AssessmentService = {
  save,
  userHistory
};

export default AssessmentService;
