import { getUser } from '@/components/api-client/auth';
import { redirect, RedirectType } from 'next/navigation';
import { CommunitySelection } from '@/components/client/communities-selection/community-selection';

export default async function DashboardPage() {
  if (!(await getUser())) {
    redirect('/login', RedirectType.replace);
  }

  const { communities } = await getUser();

  return <CommunitySelection communities={communities} />;
}
