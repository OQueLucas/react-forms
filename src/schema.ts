import { z } from "zod";

export const schemaForm = z
  .object({
    address: z.object({
      zipCode: z.string().min(8, "Por favor, informe um CEP valido"),
      street: z.string().min(1, "Por favor, informe uma rua valida"),
      number: z.string().min(1, "Por favor, informe um numero válido"),
      city: z.string().min(1, "Por favor, informe uma cidade valida"),
      state: z.string().min(1, "Por favor, informe um estado valido"),
      complement: z.string(),
      district: z.string().min(1, "Por favor, informe um bairro válido"),
    }),
  })
  .transform((field) => ({
    address: {
      city: field.address.city,
      complement: field.address.complement,
      district: field.address.district,
      number: field.address.number,
      state: field.address.state,
      street: field.address.street,
      zipCode: field.address.zipCode,
    },
  }));
