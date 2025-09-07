export interface Course {
  id: number;
  image: string;
  title: string;
}

export interface Project {
  id: number;
  image: string;
  title: string;
  link: string;
  category?: 'todos' | 'dev_f' | 'frontend_mentor' | 'personales';
}

export type ProjectCategory = Project['category'];