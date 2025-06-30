import { IUser } from "../commons/interface";
import { api } from "../lib/axiios";

const URL = "/users"; 

export const save = async (payload: IUser): Promise<any> => {
    let response;
    try {
        response = await api.post(`${URL}`, payload);
    } catch (error: any) {
        console.error("Erro no serviço ao salvar avaliação:", error);
        response = error.response;
        throw error;
    }
    return response;
}

export const find = async (userEmail: string): Promise<any> => {
    let response;
    try {
        response = await api.get(`${URL}/find?email=${userEmail}`);
    } catch (error: any) {
        console.error("Erro ao buscar usuário:", error);
        response = error.response;
        throw error;
    }
    return response;
}

const UserService = {
  save,
  find
};

export default UserService;
