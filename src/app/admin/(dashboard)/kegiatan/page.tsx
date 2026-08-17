import { getActivities } from '@/lib/db';
import ActivityClientPage from './ActivityClientPage';

export default async function AdminActivityPage() {
  const activities = await getActivities();
  return <ActivityClientPage initialData={activities} />;
}
