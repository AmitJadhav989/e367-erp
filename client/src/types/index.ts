export type UserRole =
  | 'SUPER_ADMIN'
  | 'COLLEGE_ADMIN'
  | 'PRINCIPAL'
  | 'HOD'
  | 'FACULTY'
  | 'STUDENT'
  | 'PARENT'
  | 'ACCOUNTANT'
  | 'EXAM_CELL'
  | 'PLACEMENT_OFFICER'
  | 'LIBRARIAN';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: string;
  profile?: StudentProfile | FacultyProfile | ParentProfile;
  createdAt: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  usn: string;
  firstName: string;
  lastName: string;
  photo?: string;
  dob: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  bloodGroup?: string;
  email: string;
  phone: string;
  address?: string;
  branchId: string;
  branch?: Department;
  semester: number;
  section: string;
  batch: string;
  attendance?: number;
  cgpa?: number;
  backlogs?: number;
}

export interface FacultyProfile {
  id: string;
  userId: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  photo?: string;
  designation: string;
  qualification: string;
  departmentId: string;
  department?: Department;
  joiningDate: string;
}

export interface ParentProfile {
  id: string;
  userId: string;
  relation: string;
  phone: string;
  email: string;
  occupation?: string;
  wards: StudentProfile[];
}

export interface Department {
  id: string;
  name: string;
  code: string;
  hodId?: string;
  establishedYear: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  hours: number;
  departmentId: string;
  department?: Department;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LEAVE';
  markedBy: string;
  createdAt: string;
}

export interface Exam {
  id: string;
  name: string;
  type: 'INTERNAL' | 'MIDTERM' | 'PRACTICAL' | 'END_SEMESTER' | 'BACKLOG' | 'SUPPLEMENTARY';
  semester: number;
  courseId: string;
  course?: Course;
  date: string;
  maxMarks: number;
  passingMarks: number;
}

export interface ExamResult {
  id: string;
  studentId: string;
  examId: string;
  exam?: Exam;
  marksObtained: number;
  grade?: string;
  sgpa?: number;
  cgpa?: number;
}

export interface FeeStructure {
  id: string;
  name: string;
  amount: number;
  semester: number;
  category: string;
  installmentAllowed: boolean;
}

export interface FeeTransaction {
  id: string;
  studentId: string;
  feeStructureId: string;
  amountPaid: number;
  mode: 'CASH' | 'CARD' | 'UPI' | 'NET_BANKING' | 'CHEQUE';
  transactionId: string;
  receiptUrl?: string;
  paidAt: string;
}

export interface PlacementDrive {
  id: string;
  companyId: string;
  company?: Company;
  role: string;
  package: number;
  eligibility: string;
  deadline: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  quantity: number;
  rack?: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'ANNOUNCEMENT' | 'REMINDER' | 'ALERT';
  priority: 'URGENT' | 'NORMAL';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  attachmentUrl?: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}
