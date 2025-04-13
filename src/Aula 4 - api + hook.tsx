import * as S from "./styles";
import { Input } from "./components/Input";
import { useCep } from "./useCep";

function App() {
  const { errors, handleFormSubmit, handleSubmit, register } = useCep();

  return (
    <S.Container>
      <h2>CEP</h2>

      <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          {...register("address.zipCode")}
          type="text"
          label="CEP"
          maxLength={9}
          helperText={errors.address?.zipCode?.message}
        />
        <Input
          {...register("address.street")}
          type="text"
          label="Rua"
          helperText={errors.address?.street?.message}
        />
        <Input
          {...register("address.number")}
          type="text"
          label="Numero"
          helperText={errors.address?.number?.message}
        />
        <Input
          {...register("address.district")}
          type="text"
          label="Bairro"
          helperText={errors.address?.district?.message}
        />
        <Input
          {...register("address.complement")}
          type="text"
          label="Complemento"
          helperText={errors.address?.complement?.message}
        />
        <Input
          {...register("address.city")}
          type="text"
          label="Cidade"
          helperText={errors.address?.city?.message}
        />
        <Input
          {...register("address.state")}
          type="text"
          label="Estado"
          helperText={errors.address?.state?.message}
        />

        <S.Button type="submit">Enviar</S.Button>
      </S.Form>
    </S.Container>
  );
}

export default App;
