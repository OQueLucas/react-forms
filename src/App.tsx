import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    password: z.string().min(6, "A senha precisar ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  })
  .transform((fields) => ({
    password: fields.password.toLocaleUpperCase(),
    confirmPassword: fields.confirmPassword.toLocaleUpperCase(),
  }));

type FormProps = z.infer<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  console.log("error", errors);

  const handleForm = (data: FormProps) => {
    console.log(data);
  };

  return (
    <div>
      <h2>Zod</h2>

      <form onSubmit={handleSubmit(handleForm)}>
        <input
          type="text"
          {...register("password")}
          placeholder="Informe sua senha"
        />
        {errors.password?.message && <p>{errors.password.message}</p>}
        <input
          type="text"
          {...register("confirmPassword")}
          placeholder="Confirme sua senha"
        />
        {errors.confirmPassword?.message && (
          <p>{errors.confirmPassword.message}</p>
        )}

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
