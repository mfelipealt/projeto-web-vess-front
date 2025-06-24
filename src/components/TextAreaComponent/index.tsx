import { Field, Textarea } from "@chakra-ui/react";

type TextAreaComponentProps = {
  label: string;
  placeholder: string; 
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextAreaComponent = ({ name, label, value, onChange, placeholder }: TextAreaComponentProps) => {

  return (
    <Field.Root required py={6} px={3}>
      <Field.Label>{label}<Field.RequiredIndicator /></Field.Label>
      <Textarea autoresize
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