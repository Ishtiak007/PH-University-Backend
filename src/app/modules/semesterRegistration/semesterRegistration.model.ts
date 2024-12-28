import mongoose, { Schema } from 'mongoose';
import { TSemesterRegisteration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegisteration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    unique: true,
    required: true,
  },
});

export const SemesterRegistration = mongoose.model<TSemesterRegisteration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);

academicSemester: Types.ObjectId;
status: 'UPCOMING' | 'ONGOING' | 'ENDED';
startDate: Date;
endDate: Date;
minCredit: number;
maxCredit: number;
