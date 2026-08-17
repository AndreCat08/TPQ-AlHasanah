import { getSubjects, getIcons } from '@/lib/db';
import SubjectClientPage from './SubjectClientPage';

export default async function AdminSubjectPage() {
  const subjects = await getSubjects();
  const icons = await getIcons();
  return <SubjectClientPage initialData={subjects} icons={icons} />;
}
