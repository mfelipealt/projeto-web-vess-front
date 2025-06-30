import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { ICountry, ILanguage } from '../commons/interface';

type FormData = {
  nome: string;
  email: string;
  pais: ICountry | null;
  endereco: string;
  idioma: ILanguage | null;
};

type UserConfigContextType = {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
};

const UserConfigContext = createContext<UserConfigContextType | undefined>(undefined);

export const UserConfigProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    pais: null,
    endereco: '',
    idioma: null,
  });

  useEffect(() => {
      const savedData = localStorage.getItem('userConfig');
      if (savedData) {
        try {
          setFormData(JSON.parse(savedData));
        } catch (error) {
          console.error("Erro ao carregar dados do Contexto", error);
        }
      }
  }, []);

  return (
    <UserConfigContext.Provider value={{ formData, setFormData }}>
      {children}
    </UserConfigContext.Provider>
  );
};

export const useUserConfig = () => {
  const context = useContext(UserConfigContext);
  if (context === undefined) {
    throw new Error('useUserConfig must be used within a UserConfigProvider');
  }
  return context;
};