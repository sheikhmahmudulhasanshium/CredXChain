import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FAQ = () => {
  return (
    <div className='px-8 py-4 text-base text-justify text-white'>
      <div className="mb-4">
        <p className='text-2xl text-cyan-400'>Frequently Asked Questions (FAQ)</p>
      </div>

      <div className="gap-2">
        <p className='text-cyan-400'>What information is required to create an educational certificate?</p>
        <div className='pt-4'>
          <p>To create an educational certificate, the following information is required:</p>
          <Table className='w-full text-left'>
            <TableCaption className='text-left'>A list of required information for creating an educational certificate.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xl">Category</TableHead>
                <TableHead className='text-xl'>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className='font-bold'>Student Information</TableCell>
                <TableCell>Full Name, Date of Birth, Student ID or Registration Number</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-bold'>Institution Details</TableCell>
                <TableCell>Name of the Institution, Address, Contact Information (Phone, Email)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-bold'>Course Details</TableCell>
                <TableCell>Course Name, Course Code, Duration of the Course, Start and End Dates</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-bold'>Academic Performance</TableCell>
                <TableCell>Grades or Marks, GPA or Class Ranking (if applicable), Any Honors or Distinctions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-bold'>Certificate Information</TableCell>
                <TableCell>Certificate Number or Unique Identifier, Date of Issuance, Expiry Date (if applicable)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-bold'>Signatory Details</TableCell>
                <TableCell>Names and Titles of Authorized Signatories, Digital or Physical Signatures</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-bold'>Official Logos and Seals</TableCell>
                <TableCell>Institution Logo, Official Seal or Stamp</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-bold'>Additional Information (if applicable)</TableCell>
                <TableCell>Accreditation Details, QR Code or Barcode for Verification, Any Legal or Compliance Statements</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="pt-4">
        <p className='text-cyan-400'>Why is student information necessary?</p>
        <p>Student information, such as full name, date of birth, and student ID, uniquely identifies the individual receiving the certificate, ensuring that it is accurately attributed and verifiable.</p>
      </div>

      <div className="pt-4">
        <p className='text-cyan-400'>What details about the institution need to be included?</p>
        <p>The certificate must include the name, address, and contact information of the educational institution to verify its authenticity and provide context about the issuing authority.</p>
      </div>

      {/* Add more FAQs here */}
    </div>
  );
};

export default FAQ;