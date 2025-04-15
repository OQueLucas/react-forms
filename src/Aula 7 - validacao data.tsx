import { useForm } from "react-hook-form";
import { Input } from "./components/Input";
import * as S from "./styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  expire_at: z.coerce.date().refine((data) => data > new Date(), {
    message: "Data invalida",
  }),
  birthdate: z.coerce
    .date()
    .min(new Date("1900-01-01"), {
      message: "Tem certeza?",
    })
    .max(new Date(), {
      message: "Muito jovem",
    }),
  finalDate: z.coerce.date().max(new Date(), {
    message: "Muito jovem",
  }),
});

type FormData = z.infer<typeof schema>;

function App() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  console.log(errors);

  return (
    <S.Container>
      <h2>Aula</h2>

      <S.Form onSubmit={handleSubmit((data) => console.log("result", data))}>
        <Input
          type="date"
          {...register("expire_at")}
          helperText={errors.expire_at?.message}
        />
        <Input
          type="date"
          {...register("birthdate")}
          helperText={errors.birthdate?.message}
        />
        <Input
          type="date"
          {...register("finalDate")}
          helperText={errors.finalDate?.message}
        />

        <S.Button type="submit">Enviar</S.Button>
      </S.Form>
    </S.Container>
  );
}

export default App;
