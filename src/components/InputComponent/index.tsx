import { Field, Input } from "@chakra-ui/react";

type InputComponentProps = {
  label: string;
  placeholder: string; 
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputComponent = ({ name, label, value, onChange, placeholder }: InputComponentProps) => {

  return (
    <Field.Root required py={6} px={3}>
      <Field.Label>{label}<Field.RequiredIndicator /></Field.Label>
      <Input 
        placeholder={placeholder} 
        name={name} 
        value={value} 
        onChange={onChange} 
        w={"100%"}
      />
      <Field.ErrorText>Esse campo é obrigatório</Field.ErrorText>
    </Field.Root>
  )
};