
export interface InternshipOffer {
  id?: number;
  title: string;
  companyName: string;
  description: string;
  location: string;
  domain: string;
  duration: number;
  skills: string;
  status?: 'OPEN' | 'CLOSED';
  companyId?: number;
  recruiterId?: number;
}

export interface Application {
  id?: number;
  studentId: number;
  motivationLetter?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  date: Date | string;
  internshipOffer?: InternshipOffer; 
}

export interface Milestone {
  id?: number;
  title: string;
  date: string | Date;
  status: 'PENDING' | 'COMPLETED';
  deliverables: string;
}

export interface Evaluation {
  id?: number;
  grade: number;
  comments: string;
  type: string;
}

export interface Internship {
  id?: number;
  startDate: string | Date;
  endDate?: string | Date;
  status: string;
  studentId: number;
  applicationSource?: Application; 
  milestones?: Milestone[];
  evaluations?: Evaluation[];
}
export interface Notification {
  id: number;
  title: string;
  message: string;
  date: Date;
  isRead: boolean;
  type: 'INFO' | 'SUCCESS' | 'WARNING';
}