"use client";

import { createContext, useContext, useState } from "react";

interface FormData {
  firstName?: string;
  lastName?: string;
  birthday?: string;
  phoneNumber?: string;
  sex?: string;
  password: string;
  addressLineOne?: string;
  addressLineTwo?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface FormContextProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export function FormProvider({ children }) {
  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const [formData, setFormData] = useState<FormData>({});

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
