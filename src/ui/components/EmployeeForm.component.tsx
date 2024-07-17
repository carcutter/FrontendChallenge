import { EmployeeModel } from "@/domain/models/employee.model";
import {
  FormElement,
  Label,
  StyledForm,
  StyledInput,
  SubmitButton,
} from "@/styles/employee-form.styles";
import { Typography } from "@/styles/home.styles";
import { useParams } from "next/navigation";
import React, { useState } from "react";

interface EmployeeFormProps {
  employee?: EmployeeModel;
  title: string;
  submit: (employee: { id: number; name: string; salary: number }) => void;
}

const EmployeeForm = ({ employee, submit, title }: EmployeeFormProps) => {
  const { employeeId } = useParams();
  const [form, setForm] = useState<Partial<EmployeeModel>>(employee || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = () => {
    const isSalaryValid = !isNaN(Number(form.employee_salary));
    return form.employee_name && form.employee_salary && isSalaryValid;
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    submit({
      id: Number(employeeId),
      name: form.employee_name as string,
      salary: Number(form.employee_salary),
    });
  };

  return (
    <React.Fragment>
      <Typography size={20}>{title}</Typography>
      <StyledForm>
        <FormElement>
          <Label htmlFor="employee_name">Employee Name</Label>
          <StyledInput
            type="text"
            name="employee_name"
            value={form.employee_name || ""}
            onChange={handleChange}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="employee_salary">Employee Salary</Label>
          <StyledInput
            type="number"
            name="employee_salary"
            value={form.employee_salary || ""}
            onChange={handleChange}
          />
        </FormElement>
        <FormElement>
          <SubmitButton
            disabled={!isFormValid()}
            type="submit"
            onClick={onSubmit}
          >
            Submit
          </SubmitButton>
        </FormElement>
      </StyledForm>
    </React.Fragment>
  );
};

export default EmployeeForm;
