"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  profileImage: z.any().optional(),
  fullName: z.string().min(2, { message: "* Full Name must be at least 2 characters." }),
  dateOfBirth: z.string().min(1, { message: "* Date of Birth is required." }),
  studentId: z.string().min(1, { message: "* Student ID Number is required." }),
  regestrationId: z.string().min(1, { message: "* Registration Number is required." }),
  birthRegestrationNo: z.string().min(1, { message: "* Birth Registration Number is required." }),
  nidNo: z.string().min(0, { message: "* NID Number is required." }),
  bloodGroup: z.string().min(1, { message: "* Blood Group is required." }),
  religion: z.string().min(1, { message: "* Religion is required." }),
  gender: z.string().min(1, { message: "* Gender is required." }),
  medium: z.string().min(1, { message: "* Medium is required." }),
  presentAddress: z.string().min(1, { message: "* Present Address is required." }),
  permanentAddress: z.string().min(1, { message: "* Permanent Address Nationality is required." }),
  nationality: z.string().min(1, { message: "* Nationality is required." }),
  quota: z.string().min(1, { message: "* Quota is required." }),
  documentLink: z.string().url({ message: "* Document link must be a valid URL." }).optional(),
  
  institutionName: z.string().min(1, { message: "* Name of the Educational Institution is required." }),
  institutionEIIN: z.string().min(1, { message: "* EIIN no of the Educational Institution is required." }),
  institutionPostalCode: z.string().min(1, { message: "* Postal Code of the Educational Institution is required." }),
  institutionAddress: z.string().min(1, { message: "* Address is required." }),
  institutionContact: z.string().min(1, { message: "* Contact Information is required." }),
  courseName: z.string().min(1, { message: "* Course Name is required." }),
  courseCode: z.string().min(1, { message: "* Course Code is required." }),
  courseDuration: z.string().min(1, { message: "* Duration of the Course is required." }),
  courseStartDate: z.string().min(1, { message: "* Start Date is required." }),
  courseEndDate: z.string().min(1, { message: "* End Date is required." }),
  grades: z.string().min(1, { message: "* Grades or Marks are required." }),
  gpa: z.string().optional(),
  honors: z.string().optional(),
  certificateNumber: z.string().min(1, { message: "* Certificate Number or Unique Identifier is required." }),
  issuanceDate: z.string().min(1, { message: "* Date of Issuance is required." }),
  expiryDate: z.string().optional(),
  signatories: z.string().min(1, { message: "* Names and Titles of Authorized Signatories are required." }),
  signatures: z.string().min(1, { message: "* Digital or Physical Signatures are required." }),
  institutionLogo: z.string().min(1, { message: "* Institution Logo is required." }),
  institutionSeal: z.string().min(1, { message: "* Official Seal or Stamp is required." }),
  accreditationDetails: z.string().optional(),
  qrCode: z.string().optional(),
  legalStatements: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const formatFieldName = (fieldName: string) => {
  return fieldName
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, str => str.toUpperCase()) // Capitalize the first letter
    .trim();
};

export function CreateForm() {
  const [step, setStep] = useState(0);
  const [showDocumentField, setShowDocumentField] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImage: null,
      fullName: "",
      dateOfBirth: "",
      studentId: "",
      regestrationId: "",
      birthRegestrationNo: "",
      nidNo: "",
      bloodGroup: "",
      religion: "",
      gender: "",
      medium: "",
      presentAddress: "",
      permanentAddress: "",
      nationality: "",
      quota: "",
      documentLink: "",
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
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    // Handle form submission (e.g., send formData to API)
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    const subscription = form.watch((value) => {
      setShowDocumentField(value.quota !== "None");
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const renderFields = (fields: (keyof FormSchema)[]) => {
    return fields.map((field) => (
      <div key={field} className={field === "profileImage" ? "col-span-2" : ""}>
        <FormLabel>{formatFieldName(field)}</FormLabel>
        <FormControl>
          {field === "profileImage" ? (
            <Input type="file" accept="image/*" {...form.register(field)} />
          ) : field === "bloodGroup" || field === "religion" || field === "gender"|| field === "medium" || field === "nationality" || field === "quota"? (
            <Select onValueChange={(value) => form.setValue(field, value)} defaultValue={form.getValues(field)}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${formatFieldName(field)}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{formatFieldName(field)}</SelectLabel>
                  {field === "gender" && (
                    <>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </>
                  )}
                  {field === "bloodGroup" && (
                    <>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </>
                  )}
                  {field === "religion" && (
                    <>
                      <SelectItem value="Islam">Islam</SelectItem>
                      <SelectItem value="Hinduism">Hinduism</SelectItem>
                      <SelectItem value="Christianity">Christianity</SelectItem>
                      <SelectItem value="Buddhism">Buddhism</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </>
                  )}
                                   {field === "medium" && (
                    <>
                      <SelectItem value="Bangla">Bangla</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                    </>
                  )}
                  {field === "nationality" && (
                    <>
                      <SelectItem value="Bangladeshi">Bangladeshi</SelectItem>
                      <SelectItem value="Indian">Indian</SelectItem>
                      <SelectItem value="Nepalese">Nepalese</SelectItem>
                      <SelectItem value="Bhutanese">Bhutanese</SelectItem>
                      <SelectItem value="Maldivian">Maldivian</SelectItem>
                      <SelectItem value="Sri Lankan">Sri Lankan</SelectItem>
                    </>
                  )}
                  {field === "quota" && (
                    <>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Freedom Fighter Quota">Freedom Fighter Quota</SelectItem>
                      <SelectItem value="District Quota">District Quota</SelectItem>
                      <SelectItem value="Tribal Quota">Tribal Quota</SelectItem>
                      <SelectItem value="Physically Disabled Quota">Physically Disabled Quota</SelectItem>
                      <SelectItem value="Female Quota">Female Quota</SelectItem>
                      <SelectItem value="Minority Quota">Minority Quota</SelectItem>
                      <SelectItem value="Teacher's Children Quota">Teacher's Children Quota</SelectItem>
                      <SelectItem value="Ward Quota">Ward Quota</SelectItem>
                    </>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Input placeholder={`Enter ${formatFieldName(field)}`} {...form.register(field)} />
          )}
        </FormControl>
        {form.formState.errors[field] && (
          <p className="text-red-500 text-sm">{form.formState.errors[field]?.message as React.ReactNode}</p>
        )}
      </div>
    ));
  };

  const steps = [
    {
      title: "Student Information",
      fields: ["profileImage", "fullName", "dateOfBirth", "studentId", "medium", "regestrationId", "birthRegestrationNo", "nidNo", "gender", "bloodGroup", "religion","presentAddress", "permanentAddress", "nationality", "quota", ...(showDocumentField ? ["documentLink"] : [])] as (keyof FormSchema)[],
    },
    {
      title: "Institution Details",
      fields: ["institutionName", "institutionEIIN", "institutionPostalCode", "institutionAddress", "institutionContact"] as (keyof FormSchema)[],
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

  const progress = ((step + 1) / steps.length) * 100;

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
      <Progress value={progress} className="my-12 bg-cyan-500" />
    </div>
  );
}

