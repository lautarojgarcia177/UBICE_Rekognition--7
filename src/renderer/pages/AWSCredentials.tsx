import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";
import { IAWSCredentials } from "../../interfaces";
import { Save as Feather_Icon_Save } from "react-feather";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

interface IChakraUIFormField {
  label: string;
  fieldName: string;
  validate: ({}: any) => any;
}

function ChakraUIFormField({ label, fieldName, validate }: IChakraUIFormField) {
  return (
    <Field name={fieldName} validate={validate}>
      {({ field, form }: { field: any; form: any }) => (
        <FormControl
          isInvalid={form.errors[fieldName] && form.touched[fieldName]}
        >
          <FormLabel>{label}</FormLabel>
          <Input {...field}></Input>
          <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

function FormikWrappeable({ setValues, validateRequired }: any) {
  useEffect(() => {
    window.electron.getAWSCredentials().then((credentials: IAWSCredentials) => {
      setValues(credentials);
    });
  }, []);
  return (
    <Form>
      <ChakraUIFormField
        label="Access Key Id"
        fieldName="awsAccessKeyId"
        validate={validateRequired}
      ></ChakraUIFormField>
      <ChakraUIFormField
        label="Secret Access Key"
        fieldName="awsSecretAccessKey"
        validate={validateRequired}
      ></ChakraUIFormField>
      <Flex justifyContent="end">
        <Button marginTop="0.75rem" type="submit">
          <Feather_Icon_Save />
        </Button>
      </Flex>
    </Form>
  );
}

export default function AWSCredentials() {
  const toast = useToast();

  function validateRequired(value: string) {
    let error;
    if (!value) {
      error = "Debe completar este campo";
    }
    return error;
  }

  function handleSubmit(values: IAWSCredentials) {
    window.electron.setAWSCredentials(values);
    toast({
      title: "Credenciales actualizadas",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  return (
    <Formik
      initialValues={{
        awsAccessKeyId: "",
        awsSecretAccessKey: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ setValues }) => (
        <FormikWrappeable
          setValues={setValues}
          validateRequired={validateRequired}
        />
      )}
    </Formik>
  );
}
