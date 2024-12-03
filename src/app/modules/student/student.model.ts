import { Schema, model } from 'mongoose';
import {
  Student,
  TGuardian,
  TLocalGuardian,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'This first name field is required'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'This last name field is required'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'This FatharName field is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'This fatherOccupation field is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'This fatherContactNo field is required'],
  },
  motherName: {
    type: String,
    required: [true, 'This motherName field is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'This motherOccupation field is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'This motherContactNo field is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'This localGuardianSchema field is required'],
  },
  occupation: {
    type: String,
    required: [true, 'This occupation field is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'This contactNo field is required'],
  },
  address: {
    type: String,
    required: [true, 'This address field is required'],
  },
});

// studentSchema model...............................
const studentSchema = new Schema<Student>({
  id: String,
  name: {
    type: userNameSchema,
    required: [true, 'This name field is required'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'This gender field is required'],
  },
  dateOfBirth: String,
  email: {
    type: String,
    required: [true, 'This dateOfBirth field is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'This contactNo field is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'This emergencyContactNo field is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: [true, 'This guardian field is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'This localGuardian field is required'],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

// model for the student
export const StudentModel = model<Student>('Student', studentSchema);
