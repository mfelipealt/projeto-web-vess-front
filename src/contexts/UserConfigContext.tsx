import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type FormData = {
  nome: string;
  email: string;
  pais: string;
  endereco: string;
  idioma: string;
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
    pais: '',
    endereco: '',
    idioma: '',
  });

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