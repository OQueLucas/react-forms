import { useForm } from "react-hook-form";
import * as S from "./styles";
import { z, ZodError } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, Checkbox } from "./components/Input";

const schema = z
  .object({
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    qtd: z
      .number({
        errorMap: () => {
          return {
            message: "Informe um numero válido",
          };
        },
      })
      .positive("Por favor, informe um numero maior que 0"),
    url: z.string().url("Por favor, informe uma URL válida"),
    agree: z.boolean(),
    select: z.string(),
    role: z.enum(["admin", "user"], {
      errorMap: () => {
        return { message: "Informe 'admin' ou 'user'" };
      },
    }),
  })
  .refine((fields) => fields.agree === true, {
    path: ["agree"],
    message: "Precisa aceitar os termos",
  })
  .refine((fields) => fields.select.length, {
    path: ["select"],
    message: "Por favor, selecione uma opção",
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  })
  .transform((fields) => ({
    password: fields.password.toLocaleUpperCase(),
    confirmPassword: fields.confirmPassword.toLocaleUpperCase(),
    agree: fields.agree,
    select: fields.select,
    qtd: fields.qtd,
    url: fields.url.toLocaleLowerCase(),
    role: fields.role,
  }));

type FormProps = z.infer<typeof schema>;

function App() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  console.log(errors);

  const handleForm = (data: FormProps) => {
    console.log({ data });

    // const exampleError = {
    //   agree: false,
    //   confirmPassword: "123456",
    //   password: "12345",
    //   qtd: -1,
    //   role: "asas",
    //   select: "",
    //   url: "http://",
    // };

    try {
      const result = schema.parse(data);

      console.log("result", result);
    } catch (err) {
      if (err instanceof ZodError) console.error(err.flatten());
    }
  };

  return (
    <S.Container>
      <h2>Advanced Forms</h2>

      <S.Form onSubmit={handleSubmit(handleForm)}>
        <Input
          label="Senha"
          type="password"
          {...register("password")}
          placeholder="Informe sua senha"
          helperText={errors.password?.message}
        />

        <Input
          label="Confirmação de senha"
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirme sua senha"
          helperText={errors.confirmPassword?.message}
        />

        <Input
          label="Quantidade"
          type="number"
          {...register("qtd", {
            setValueAs: (value: string) => parseInt(value, 10),
          })}
          placeholder="Informe a quantidade"
          helperText={errors.qtd?.message}
        />

        <Input
          label="URL"
          type="text"
          {...register("url")}
          placeholder="Informe a url"
          helperText={errors.url?.message}
        />

        <Input
          label="Permissão"
          type="text"
          {...register("role")}
          placeholder="Informe a permissão"
          helperText={errors.role?.message}
        />

        <Select
          {...register("select")}
          label="Select"
          helperText={errors.select?.message}
        >
          <option selected value="">
            Selecione uma opção
          </option>
          <option value="Option1">Option 1</option>
          <option value="Option2">Option 2</option>
          <option value="Option3">Option 3</option>
        </Select>

        <Checkbox
          {...register("agree")}
          label="Confordo com os termos"
          type="checkbox"
          helperText={errors.agree?.message}
        />

        <S.Button type="submit">Enviar</S.Button>
      </S.Form>
    </S.Container>
  );
}

export default App;
