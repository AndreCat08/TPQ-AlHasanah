import { getAsatidz } from '@/lib/db';
import AsatidzClientPage from './AsatidzClientPage';

export default async function AdminAsatidzPage() {
  const asatidz = await getAsatidz();
  return <AsatidzClientPage initialData={asatidz} />;
}
