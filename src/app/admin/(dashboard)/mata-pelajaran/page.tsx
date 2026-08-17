import { getSubjects } from '@/lib/db';
import SubjectClientPage from './SubjectClientPage';

export default async function AdminSubjectPage() {
  const subjects = await getSubjects();
  return <SubjectClientPage initialData={subjects} />;
}
