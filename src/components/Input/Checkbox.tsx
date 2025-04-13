import { forwardRef, InputHTMLAttributes, useId } from "react";

import * as S from "./styles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = "text", label = "", helperText = "", name = "", ...props },
    ref
  ) => {
    const inputId = useId();
    const hasError = helperText.length > 0;

    return (
      <S.Container>
        <div>
          <S.Input
            id={inputId}
            type={type}
            name={name}
            ref={ref}
            hasError={hasError}
            {...props}
          />
          <S.Label htmlFor={inputId}>{label}</S.Label>
        </div>
        {hasError && <S.HelperText>{helperText}</S.HelperText>}
      </S.Container>
    );
  }
);
