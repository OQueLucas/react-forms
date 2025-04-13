import { zodResolver } from "@hookform/resolvers/zod";
import { schemaForm } from "./schema";
import { AddressProps, FormProps } from "./types";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import axios from "axios";

// hook para aula 4

export const useCep = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schemaForm),
    defaultValues: {
      address: {
        city: "",
        complement: "",
        district: "",
        number: "",
        state: "",
        street: "",
        zipCode: "",
      },
    },
  });

  const zipCode = watch("address.zipCode");

  const handleFormSubmit = (data: FormProps) => console.log("submit", data);

  const handleSetData = useCallback(
    (data: AddressProps) => {
      setValue("address.city", data.localidade);
      setValue("address.street", data.logradouro);
      setValue("address.state", data.uf);
      setValue("address.district", data.bairro);
      setValue("address.complement", data.complemento);
    },
    [setValue]
  );

  const handleFetchAddress = useCallback(
    async (zipCode: string) => {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`
      );
      handleSetData(data);
    },
    [handleSetData]
  );

  useEffect(() => {
    // setValue('address.zipCode', zipCodMask(zipCode))

    if (zipCode.length !== 8) return;

    handleFetchAddress(zipCode);
  }, [handleFetchAddress, zipCode]);

  console.log(errors);

  return {
    errors,
    register,
    handleSubmit,
    handleFormSubmit,
  };
};
