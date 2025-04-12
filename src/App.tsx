import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform//resolvers/yup";
import * as Yup from "yup";
import { useEffect } from "react";

import * as S from "./styles";

const asyncFunction = async () => {
  const myPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello");
    }, 3000);
  });

  return myPromise;
};

const schema = Yup.object().shape({
  password: Yup.string()
    .min(6, "A senha precisa ter pelo menos 6 caracteres")
    .required("Campo obrigatorio!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "As senhas precisam ser iguais!")
    .required("Campo obrigatorio!"),
});

function App() {
  const { register, handleSubmit, formState, reset, setFocus } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { errors, isSubmitting } = formState;

  console.log("errors", errors);
  console.log("isSubmitting", isSubmitting);

  const handleSubmitData = async (data: any) => {
    console.log("submit", data);

    await asyncFunction();
  };

  // useEffect(() => {
  //   setFocus("password");
  // }, [setFocus]);

  return (
    <S.Container>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <h2>Reset Password</h2>

        <input
          {...register("password")}
          autoFocus
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          {...register("confirmPassword")}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirmação de senha"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </S.Container>
  );
}

export default App;
