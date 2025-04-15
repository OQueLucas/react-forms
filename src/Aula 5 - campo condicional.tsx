import { useForm } from "react-hook-form";
import * as S from "./styles";
import { Checkbox, Input } from "./components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { cpfMask } from "./components/masks/cpf";
import { cnpjMask } from "./components/masks/cnpj";

const schema = z
  .object({
    cpf: z
      .string()
      .min(14, "Por favor, informe um CPF valido")
      .max(14, "Por favor, informe um CPF valido"),
    hasCnpj: z.boolean(),
    cnpj: z.string(),
  })
  .superRefine((value, ctx) => {
    if (value.hasCnpj && value.cnpj.length < 18) {
      ctx.addIssue({
        path: ["cnpj"],
        code: z.ZodIssueCode.too_small,
        minimum: 18,
        type: "string",
        inclusive: true,
        message: "Por favor, informe um CNPJ válido",
      });
    }
  })
  .transform((fields) => ({
    cpf: fields.cpf,
    hasCnpj: fields.hasCnpj,
    cnpj: fields.hasCnpj ? fields.cnpj : "",
  }));

type FormProps = z.infer<typeof schema>;

function App() {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      cpf: "",
      cnpj: "",
      hasCnpj: false,
    },
  });

  console.log(errors);

  const handleSubmitForm = (data: FormProps) => {
    console.log(data);
  };

  const hasCnpj = watch("hasCnpj");
  const cpf = watch("cpf");

  useEffect(() => {
    setValue("cpf", cpfMask(cpf));
  }, [cpf, setValue]);

  return (
    <S.Container>
      <h2>Validação</h2>

      <S.Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Input
          {...register("cpf")}
          label="CPF"
          maxLength={14}
          helperText={errors.cpf?.message}
        />
        <Checkbox {...register("hasCnpj")} label="Tem CNPJ?" />

        {hasCnpj && (
          <Input
            {...register("cnpj")}
            label="CNPJ"
            maxLength={18}
            helperText={errors.cnpj?.message}
            onChange={(event) => {
              const { value } = event.target;
              event.target.value = cnpjMask(value);
            }}
          />
        )}

        <S.Button type="submit">Enviar</S.Button>
      </S.Form>
    </S.Container>
  );
}

export default App;
