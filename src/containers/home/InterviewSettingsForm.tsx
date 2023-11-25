import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import { useData } from "./DataProvider";

const InterviewDetailsForm: React.FC = () => {
  const { handlePrevButtonClick, state, setState } = useData();
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: state.interviewSettings.interviewMode || "",
      interviewDuration: state.interviewSettings.interviewDuration || "",
      interviewLanguage: state.interviewSettings.interviewLanguage || "",
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview mode is required"),
      interviewDuration: Yup.string().required("Interview duration is required"),
      interviewLanguage: Yup.string().required("Interview language is required"),
    }),
    onSubmit: (values) => {
  
      alert("Form successfully submitted");
    },
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      interviewSettings: {
        interviewDuration: values.interviewDuration==="short"?"Short":values.interviewDuration==="medium"?"Medium":values.interviewDuration==="long"?"Long":"",
        interviewLanguage: values.interviewLanguage==="en"?"English":values.interviewLanguage==="hi"?"Hindi":"",
        interviewMode: values.interviewMode==="offline"?"Offline":values.interviewMode==="online"?"Online":"" ,
       },
    }));
    console.log({ values });
  }, [values])
  

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values.interviewMode==="Offline"?"offline":values.interviewMode==="Online"?"online":""}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values.interviewDuration==="Short"?"short":values.interviewDuration==="Medium"?"medium":values.interviewDuration==="Long"?"long":""}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Job Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage==="English"?"en":values.interviewLanguage==="Hindi"?"hi":""}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={handlePrevButtonClick}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
