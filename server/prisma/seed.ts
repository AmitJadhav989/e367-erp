import { PrismaClient, UserRole, Gender, AttendanceStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean existing data
  await prisma.auditLog.deleteMany();
  await prisma.chatMessage.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.placementApplication.deleteMany();
  await prisma.placementDrive.deleteMany();
  await prisma.company.deleteMany();
  await prisma.feeTransaction.deleteMany();
  await prisma.feeStructure.deleteMany();
  await prisma.examResult.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.attendanceRecord.deleteMany();
  await prisma.bookTransaction.deleteMany();
  await prisma.book.deleteMany();
  await prisma.transportAllocation.deleteMany();
  await prisma.busRoute.deleteMany();
  await prisma.hostelAllocation.deleteMany();
  await prisma.room.deleteMany();
  await prisma.hostel.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.facultyProfile.deleteMany();
  await prisma.parentProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.course.deleteMany();
  await prisma.batch.deleteMany();
  await prisma.department.deleteMany();

  const password = await bcrypt.hash('password123', 10);

  // Departments
  const departments = await Promise.all([
    prisma.department.create({ data: { name: 'Computer Science & Engineering', code: 'CSE', establishedYear: 2001 } }),
    prisma.department.create({ data: { name: 'Electronics & Communication', code: 'ECE', establishedYear: 2001 } }),
    prisma.department.create({ data: { name: 'Mechanical Engineering', code: 'ME', establishedYear: 2002 } }),
    prisma.department.create({ data: { name: 'Civil Engineering', code: 'CE', establishedYear: 2002 } }),
    prisma.department.create({ data: { name: 'Information Technology', code: 'IT', establishedYear: 2005 } }),
    prisma.department.create({ data: { name: 'Electrical & Electronics', code: 'EEE', establishedYear: 2003 } }),
  ]);

  // Batches
  const batches = await Promise.all([
    prisma.batch.create({ data: { name: '2024-2028', year: 2024 } }),
    prisma.batch.create({ data: { name: '2023-2027', year: 2023 } }),
    prisma.batch.create({ data: { name: '2022-2026', year: 2022 } }),
  ]);

  // Admin users
  const admin = await prisma.user.create({
    data: { email: 'admin@e367.edu.in', password, role: UserRole.COLLEGE_ADMIN, isActive: true },
  });

  const hod = await prisma.user.create({
    data: { email: 'hod.cse@e367.edu.in', password, role: UserRole.HOD, isActive: true },
  });

  // Faculty
  const facultyUser = await prisma.user.create({
    data: { email: 'faculty1@e367.edu.in', password, role: UserRole.FACULTY, isActive: true },
  });

  await prisma.facultyProfile.create({
    data: {
      userId: facultyUser.id,
      employeeId: 'FAC001',
      firstName: 'Arun',
      lastName: 'Kumar',
      designation: 'Professor',
      qualification: 'PhD, IIT Bombay',
      departmentId: departments[0].id,
      joiningDate: new Date('2015-06-01'),
    },
  });

  const hodProfile = await prisma.facultyProfile.create({
    data: {
      userId: hod.id,
      employeeId: 'FAC002',
      firstName: 'Meena',
      lastName: 'Rajan',
      designation: 'Professor & Head',
      qualification: 'PhD, IISc',
      departmentId: departments[0].id,
      joiningDate: new Date('2010-07-01'),
    },
  });

  // Update HOD with FacultyProfile id (not User id)
  await prisma.department.update({
    where: { id: departments[0].id },
    data: { hodId: hodProfile.id },
  });

  // Students
  const studentData = [
    { usn: 'E367CS001', firstName: 'Aarav', lastName: 'Mehta', branch: departments[0].id, sem: 6, batch: batches[1].id },
    { usn: 'E367CS002', firstName: 'Priya', lastName: 'Sharma', branch: departments[0].id, sem: 6, batch: batches[1].id },
    { usn: 'E367EC001', firstName: 'Rahul', lastName: 'Verma', branch: departments[1].id, sem: 4, batch: batches[2].id },
    { usn: 'E367ME001', firstName: 'Ananya', lastName: 'Patel', branch: departments[2].id, sem: 8, batch: batches[0].id },
    { usn: 'E367CS003', firstName: 'Vikram', lastName: 'Singh', branch: departments[0].id, sem: 6, batch: batches[1].id },
    { usn: 'E367EC002', firstName: 'Neha', lastName: 'Gupta', branch: departments[1].id, sem: 4, batch: batches[2].id },
  ];

  for (const s of studentData) {
    const user = await prisma.user.create({
      data: { email: `${s.usn.toLowerCase()}@e367.edu.in`, password, role: UserRole.STUDENT, isActive: true },
    });
    await prisma.studentProfile.create({
      data: {
        userId: user.id,
        usn: s.usn,
        firstName: s.firstName,
        lastName: s.lastName,
        dob: new Date('2003-01-15'),
        gender: Gender.MALE,
        email: `${s.usn.toLowerCase()}@e367.edu.in`,
        phone: '9876543210',
        branchId: s.branch,
        semester: s.sem,
        section: 'A',
        batchId: s.batch,
        cgpa: 7.5 + Math.random(),
        backlogs: Math.floor(Math.random() * 2),
      },
    });
  }

  // Courses
  const courses = await Promise.all([
    prisma.course.create({ data: { code: 'CS101', name: 'Data Structures', credits: 4, hours: 4, departmentId: departments[0].id } }),
    prisma.course.create({ data: { code: 'CS201', name: 'Algorithms', credits: 4, hours: 4, departmentId: departments[0].id } }),
    prisma.course.create({ data: { code: 'CS301', name: 'Database Management Systems', credits: 3, hours: 3, departmentId: departments[0].id } }),
    prisma.course.create({ data: { code: 'CS401', name: 'Operating Systems', credits: 3, hours: 3, departmentId: departments[0].id } }),
    prisma.course.create({ data: { code: 'EC101', name: 'Digital Electronics', credits: 4, hours: 4, departmentId: departments[1].id } }),
    prisma.course.create({ data: { code: 'ME101', name: 'Thermodynamics', credits: 4, hours: 4, departmentId: departments[2].id } }),
  ]);

  // Fee Structures
  await Promise.all([
    prisma.feeStructure.create({ data: { name: 'Tuition Fee - Sem 1', amount: 85000, semester: 1, category: 'General' } }),
    prisma.feeStructure.create({ data: { name: 'Tuition Fee - Sem 2', amount: 85000, semester: 2, category: 'General' } }),
    prisma.feeStructure.create({ data: { name: 'Development Fee', amount: 15000, semester: 1, category: 'General' } }),
    prisma.feeStructure.create({ data: { name: 'Lab Fee', amount: 5000, semester: 1, category: 'General' } }),
  ]);

  // Books
  await Promise.all([
    prisma.book.create({ data: { title: 'Introduction to Algorithms', author: 'CLRS', isbn: '9780262033848', category: 'Computer Science', quantity: 10, rack: 'A-12' } }),
    prisma.book.create({ data: { title: 'Database Systems', author: 'Elmasri & Navathe', isbn: '9780133970777', category: 'Computer Science', quantity: 8, rack: 'A-15' } }),
    prisma.book.create({ data: { title: 'Digital Design', author: 'M. Morris Mano', isbn: '9780134549897', category: 'Electronics', quantity: 6, rack: 'B-08' } }),
    prisma.book.create({ data: { title: 'Engineering Thermodynamics', author: 'P.K. Nag', isbn: '9780070260627', category: 'Mechanical', quantity: 5, rack: 'C-03' } }),
  ]);

  // Companies
  const companies = await Promise.all([
    prisma.company.create({ data: { name: 'Google', website: 'https://careers.google.com', description: 'Technology company' } }),
    prisma.company.create({ data: { name: 'Microsoft', website: 'https://careers.microsoft.com', description: 'Software company' } }),
    prisma.company.create({ data: { name: 'Amazon', website: 'https://amazon.jobs', description: 'E-commerce & cloud' } }),
  ]);

  // Placement Drives
  await Promise.all([
    prisma.placementDrive.create({
      data: { companyId: companies[0].id, role: 'Software Engineer', package: 45, eligibility: 'CGPA >= 7.0, No backlogs', deadline: new Date('2025-09-30') },
    }),
    prisma.placementDrive.create({
      data: { companyId: companies[1].id, role: 'SDE Intern', package: 30, eligibility: 'CGPA >= 6.5', deadline: new Date('2025-10-15') },
    }),
  ]);

  // Exam
  const exam = await prisma.exam.create({
    data: { name: 'Internal Assessment 1', type: 'INTERNAL', semester: 6, courseId: courses[0].id, date: new Date('2025-03-15'), maxMarks: 50, passingMarks: 20 },
  });

  // Exam Results
  const students = await prisma.studentProfile.findMany({ take: 4 });
  for (const s of students) {
    await prisma.examResult.create({
      data: { studentId: s.id, examId: exam.id, marksObtained: 30 + Math.random() * 20, grade: 'A', sgpa: 8.0 + Math.random(), cgpa: 7.5 + Math.random() },
    });
  }

  console.log('Seed complete!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
