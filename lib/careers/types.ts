export interface CareerJob {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experience: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CareerJobInput = Omit<CareerJob, 'id' | 'createdAt' | 'updatedAt'>;
