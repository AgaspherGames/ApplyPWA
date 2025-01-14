import { CustomInput } from "@agaspher/apply.ui-kit";
import { IonSpinner } from "@ionic/react";
import React, { useState } from "react";
import { JSX as IonJSX } from "@ionic/core";
import { twMerge } from "tailwind-merge";
interface UpdatebleInputProps
  extends Omit<
    IonJSX.IonInput,
    "onIonChange" | "className" | "disabled" | "value"
  > {
  value?: string;
  onChange: (value?: string) => Promise<any>;
  validate: (value?: string) => string | undefined | void;
}

const UpdatebleInput: React.FC<UpdatebleInputProps> = ({
  value,
  onChange,
  validate,
  ...props
}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  return (
    <div className="relative">
      <CustomInput
        disabled={isLoading}
        onIonChange={async (e) => {
          const value = e.target.value as string;
          const error = validate(value);
          setError(error || "");
          if (error) {
            return;
          }
          setIsLoading(true);
          setTempValue(value);
          await onChange(value);
          await new Promise((res) => setTimeout(res, 1000));
          setIsLoading(false);
        }}
        className="mb-2 disabled:text-red-600"
        value={isLoading ? tempValue : value}
        error={error}
        {...props}
      ></CustomInput>
      <IonSpinner
        className={twMerge(
          "absolute right-1 bg-transparent bottom-2 transition-all opacity-0",
          isLoading && "opacity-100"
        )}
      />
    </div>
  );
};

export default UpdatebleInput;
