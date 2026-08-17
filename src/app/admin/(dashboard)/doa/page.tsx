import { getSampleDoas } from '@/lib/db';
import DoaClientPage from './DoaClientPage';

export default async function AdminDoaPage() {
  const doas = await getSampleDoas();
  return <DoaClientPage initialData={doas} />;
}
