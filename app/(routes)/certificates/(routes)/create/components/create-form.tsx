"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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

  courses: z.array(z.object({
    courseName: z.string().min(1, { message: "* Course Name is required." }),
    courseCode: z.string().min(1, { message: "* Course Code is required." }),
    courseDuration: z.string().min(1, { message: "* Duration of the Course is required." }),
    courseStartDate: z.string().min(1, { message: "* Start Date is required." }),
    courseEndDate: z.string().min(1, { message: "* End Date is required." }),
    fullMark: z.string().min(1, { message: "* Full Mark is required." }),
    obtainedMark: z.string().min(1, { message: "* Total Obtained Mark is required." }),
    courseGPA: z.string().min(1, { message: "* Course GPA is required." }),
  })).min(1, { message: "* At least one course is required." }),

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
      
      courses: [{ courseName: "", courseCode: "", courseDuration: "", courseStartDate: "", courseEndDate: "", fullMark: "", obtainedMark: "", courseGPA: "" }],
      
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "courses",
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          Object.entries(v).forEach(([k, val]) => {
            formData.append(`${key}[${i}][${k}]`, val as any);
          });
        });
      } else {
        formData.append(key, value as any);
      }
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
                      <SelectItem value="Teacher&apos;s Children Quota">Teacher&apos;s Children Quota</SelectItem>
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

  const renderCourseFields = () => {
    return fields.map((field, index) => (
      <div key={field.id} className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="col-span-2 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Course {index + 1}</h3>
          <Button type="button" onClick={() => remove(index)}>Remove Course</Button>
        </div>
        <div>
          <FormLabel>Course Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter Course Name" {...form.register(`courses.${index}.courseName`)} />
          </FormControl>
          {form.formState.errors.courses?.[index]?.courseName && (
            <p className="text-red-500 text-sm">{form.formState.errors.courses[index]?.courseName?.message as React.ReactNode}</p>
          )}
        </div>
        <div>
          <FormLabel>Course Code</FormLabel>
          <FormControl>
            <Input placeholder="Enter Course Code" {...form.register(`courses.${index}.courseCode`)} />
          </FormControl>
          {form.formState.errors.courses?.[index]?.courseCode && (
            <p className="text-red-500             text-sm">{form.formState.errors.courses[index]?.courseCode?.message as React.ReactNode}</p>
          )}
        </div>
        <div>
          <FormLabel>Course Duration</FormLabel>
          <FormControl>
            <Input placeholder="Enter Course Duration" {...form.register(`courses.${index}.courseDuration`)} />
          </FormControl>
          {form.formState.errors.courses?.[index]?.courseDuration && (
            <p className="text-red-500 text-sm">{form.formState.errors.courses[index]?.courseDuration?.message as React.ReactNode}</p>
          )}
        </div>
        <div>
          <FormLabel>Course Start Date</FormLabel>
          <FormControl>
            <Input type="date" {...form.register(`courses.${index}.courseStartDate`)} />
          </FormControl>
          {form.formState.errors.courses?.[index]?.courseStartDate && (
            <p className="text-red-500 text-sm">{form.formState.errors.courses[index]?.courseStartDate?.message as React.ReactNode}</p>
          )}
        </div>
        <div>
          <FormLabel>Course End Date</FormLabel>
          <FormControl>
            <Input type="date" {...form.register(`courses.${index}.courseEndDate`)} />
          </FormControl>
          {form.formState.errors.courses?.[index]?.courseEndDate && (
            <p className="text-red-500 text-sm">{form.formState.errors.courses[index]?.courseEndDate?.message as React.ReactNode}</p>
          )}
        </div>
        <div>
          <FormLabel>Full Mark</FormLabel>
          <FormControl>
            <Input placeholder="Enter Full Mark" {...form.register(`courses.${index}.fullMark`)} />
          </FormControl>
          {form.formState.errors.courses?.[index]?.fullMark && (
            <p className="text-red-500 text-sm">{form.formState.errors.courses[index]?.fullMark?.message as React.ReactNode}</p>
          )}
        </div>
        <div>
          <FormLabel>Obtained Mark</FormLabel>
          <FormControl>
            <Input placeholder="Enter Obtained Mark" {...form.register(`courses.${index}.obtainedMark`)} />
          </FormControl>
          {form.formState.errors.courses?.[index]?.obtainedMark && (
            <p className="text-red-500 text-sm">{form.formState.errors.courses[index]?.obtainedMark?.message as React.ReactNode}</p>
          )}
        </div>
        <div>
          <FormLabel>Course GPA</FormLabel>
          <FormControl>
            <Input placeholder="Enter Course GPA" {...form.register(`courses.${index}.courseGPA`)} />
          </FormControl>
          {form.formState.errors.courses?.[index]?.courseGPA && (
            <p className="text-red-500 text-sm">{form.formState.errors.courses[index]?.courseGPA?.message as React.ReactNode}</p>
          )}
        </div>
      </div>
    ));
  };

  const steps = [
    {
      title: "Personal Information",
      fields: [
        "profileImage",
        "fullName",
        "dateOfBirth",
        "studentId",
        "regestrationId",
        "birthRegestrationNo",
        "nidNo",
        "bloodGroup",
        "religion",
        "gender",
        "medium",
        "presentAddress",
        "permanentAddress",
        "nationality",
        "quota",
        "documentLink",
      ],
    },
    {
      title: "Institution Information",
      fields: [
        "institutionName",
        "institutionEIIN",
        "institutionPostalCode",
        "institutionAddress",
        "institutionContact",
      ],
    },
    {
      title: "Courses",
      fields: [],
    },
    {
      title: "Academic Details",
      fields: [
        "grades",
        "gpa",
        "honors",
        "certificateNumber",
        "issuanceDate",
        "expiryDate",
        "signatories",
        "signatures",
        "institutionLogo",
        "institutionSeal",
        "accreditationDetails",
        "qrCode",
        "legalStatements",
      ],
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {renderFields(steps[step].fields as (keyof FormSchema)[])}
          {step === 2 && renderCourseFields()}
        </div>
        <div className="mt-4 flex justify-between">
          <Button type="button" onClick={prevStep} disabled={step === 0}>
            Previous
          </Button>
          <Button type="button" onClick={nextStep} disabled={step === steps.length - 1}>
            Next
          </Button>
          {step === steps.length - 1 && <Button type="submit">Submit</Button>}
        </div>
        <Progress value={(step / (steps.length - 1)) * 100} className="mt-4" />
      </form>
    </Form>
  );
}
