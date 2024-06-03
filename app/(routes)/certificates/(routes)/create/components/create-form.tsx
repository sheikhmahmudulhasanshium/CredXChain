"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller, FieldValues, ControllerRenderProps } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full Name must be at least 2 characters." }),
  dateOfBirth: z.string().min(1, { message: "Date of Birth is required." }),
  studentId: z.string().min(1, { message: "Student ID Number is required." }),
  regestrationId: z.string().min(1, { message: "Registration Number is required." }),
  institutionName: z.string().min(1, { message: "Name of the Educational Institution is required." }),
  institutionEIIN: z.string().min(1, { message: "EIIN no of the Educational Institution is required." }),
  institutionPostalCode: z.string().min(1, { message: "Postal Code of the Educational Institution is required." }),
  institutionAddress: z.string().min(1, { message: "Address is required." }),
  institutionContact: z.string().min(1, { message: "Contact Information is required." }),
  courseName: z.string().min(1, { message: "Course Name is required." }),
  courseCode: z.string().min(1, { message: "Course Code is required." }),
  courseDuration: z.string().min(1, { message: "Duration of the Course is required." }),
  courseStartDate: z.string().min(1, { message: "Start Date is required." }),
  courseEndDate: z.string().min(1, { message: "End Date is required." }),
  grades: z.string().min(1, { message: "Grades or Marks are required." }),
  gpa: z.string().optional(),
  honors: z.string().optional(),
  certificateNumber: z.string().min(1, { message: "Certificate Number or Unique Identifier is required." }),
  issuanceDate: z.string().min(1, { message: "Date of Issuance is required." }),
  expiryDate: z.string().optional(),
  signatories: z.string().min(1, { message: "Names and Titles of Authorized Signatories are required." }),
  signatures: z.string().min(1, { message: "Digital or Physical Signatures are required." }),
  institutionLogo: z.string().min(1, { message: "Institution Logo is required." }),
  institutionSeal: z.string().min(1, { message: "Official Seal or Stamp is required." }),
  accreditationDetails: z.string().optional(),
  qrCode: z.string().optional(),
  legalStatements: z.string().optional(),
})

type FormSchema = z.infer<typeof formSchema>;

const formatFieldName = (fieldName: string) => {
  return fieldName
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, str => str.toUpperCase()) // Capitalize the first letter
    .trim();
}

export function CreateForm() {
  const [step, setStep] = useState(0)
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      studentId: "",
      regestrationId: "",
      institutionName: "",
      institutionEIIN: "",
      institutionPostalCode: "",
      institutionAddress: "",
      institutionContact: "",
      courseName: "",
      courseCode: "",
      courseDuration: "",
      courseStartDate: "",
      courseEndDate: "",
      grades: "",
      gpa: "",
      honors: "",
      certificateNumber: "",
      issuanceDate: "",
      expiryDate: "",
      signatories: "",
      signatures: "",
      institutionLogo: "",
      institutionSeal: "",
      accreditationDetails: "",
      qrCode: "",
      legalStatements: "",
    },
  })

  const onSubmit = (data: FormSchema) => {
    console.log(data)
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 7))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0))

  const renderFields = (fields: (keyof FormSchema)[]) => {
    return fields.map((field) => (
      <FormField
        key={field}
        control={form.control}
        name={field}
        render={({ field, fieldState, formState }) => (
          <FormItem>
            <FormLabel>{formatFieldName(field.name)}</FormLabel>
            <FormControl>
              {field.name === "legalStatements" || field.name === "accreditationDetails" || field.name === "qrCode" ? (
                <Textarea placeholder={`Enter ${formatFieldName(field.name)}`} {...field} />
              ) : (
                <Input placeholder={`Enter ${formatFieldName(field.name)}`} {...field} />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ));
  };

  const steps = [
    {
      title: "Student Information",
      fields: ["fullName", "dateOfBirth", "studentId", "regestrationId"] as (keyof FormSchema)[],
    },
    {
      title: "Institution Details",
      fields: ["institutionName", "institutionEIIN", "institutionPostalCode", "institutionAddress", "institutionContact"] as
(keyof FormSchema)[],
    },
    {
      title: "Course Details",
      fields: ["courseName", "courseCode", "courseDuration", "courseStartDate", "courseEndDate"] as (keyof FormSchema)[],
    },
    {
      title: "Academic Performance",
      fields: ["grades", "gpa", "honors"] as (keyof FormSchema)[],
    },
    {
      title: "Certificate Information",
      fields: ["certificateNumber", "issuanceDate", "expiryDate"] as (keyof FormSchema)[],
    },
    {
      title: "Signatory Details",
      fields: ["signatories", "signatures"] as (keyof FormSchema)[],
    },
    {
      title: "Official Logos and Seals",
      fields: ["institutionLogo", "institutionSeal"] as (keyof FormSchema)[],
    },
    {
      title: "Additional Information",
      fields: ["accreditationDetails", "qrCode", "legalStatements"] as (keyof FormSchema)[],
    },
  ];

  return (
    <div className="w-full px-6 lg:px-24 md:px-20 sm:px-6">    
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h2 className="text-2xl font-bold">{steps[step].title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {renderFields(steps[step].fields)}
          </div>
          <div className="flex justify-between px-12">
            <Button type="button" onClick={prevStep} disabled={step === 0}>
              Previous
            </Button>
            {step < steps.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
