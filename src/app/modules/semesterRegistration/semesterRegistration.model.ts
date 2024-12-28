import mongoose from 'mongoose';
import { TSemesterRegisteration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegisteration>(
  {},
);

export const SemesterRegistration = mongoose.model<TSemesterRegisteration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
