import { z } from "zod";
import * as S from "./styles";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./components/Input";

const billSchema = z.array(
  z.object({
    description: z.string().min(3, "Por favor, informe uma descricao valida"),
    amount: z.number(),
  })
);

const schema = z
  .object({
    name: z.string().min(3, "Por favor, informe um nome valido"),
    bills: billSchema,
  })
  .refine((fields) => fields.bills.length > 0, {
    path: ["bills"],
    message: "Por favor, informe pelo menos uma conta",
  });

type FormDataProps = z.infer<typeof schema>;

function App() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormDataProps>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "bills",
    control,
  });

  const handleSubmitForm = (data: FormDataProps) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <S.Container>
      <h2>Aula</h2>

      <S.Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Input
          {...register("name")}
          placeholder="Informe seu nome"
          helperText={errors.name?.message}
        />

        {fields.map((field, index) => (
          <S.BillContainer>
            <Input
              {...register(`bills.${index}.description`)}
              helperText={
                errors.bills && errors.bills[index]?.description?.message
              }
            />
            <Input
              {...(register(`bills.${index}.amount`),
              {
                valueAsNumber: true,
              })}
              type="number"
              helperText={errors.bills && errors.bills[index]?.amount?.message}
            />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </S.BillContainer>
        ))}
        <button
          type="button"
          onClick={() =>
            append({
              description: "",
              amount: 0,
            })
          }
        >
          Add
        </button>

        {errors?.bills && <p>{errors.bills?.root?.message}</p>}

        <S.Button type="submit">Enviar</S.Button>
      </S.Form>
    </S.Container>
  );
}

export default App;
