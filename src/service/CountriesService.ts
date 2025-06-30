import { api } from "../lib/axiios";

const URL = "/countries"; 

const findAll = async (): Promise<any> => {
    let response;
    try {
        response = await api.get(URL);
    } catch (error: any) {
        response = error.response;
    }
    return response;
}

export const findById = async (id: number): Promise<any> => {
    let response;
    try {
        response = await api.get(`${URL}/${id}`);
    } catch (error: any) {
        response = error.response;
    }
    return response;
}

const CountryService = {
  findAll,
  findById
};

export default CountryService;
