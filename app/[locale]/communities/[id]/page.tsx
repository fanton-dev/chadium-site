import { Card } from '@/components/ui/card';
import { getCommunity } from '@/components/api-client/community';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';

interface CommunityPageProps {
  params: { id: string };
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const community = await getCommunity(params.id);
  const locale = useLocale();

  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <Card className="relative grid min-h-[80vh] my-auto w-5/6 md:w-2/3 flex-col items-center justify-center xl:px-0 overflow-hidden">
        <img
          src={community.image}
          alt={community.name}
          className="absolute inset-0 w-full h-full object-cover blur-sm"
        />

        <div className="absolute inset-0 flex h-full flex-col justify-center items-center">
          <Card className="w-96 p-8 flex flex-col justify-center items-center gap-2">
            <h1 className="text-4xl font-bold">{community.name}</h1>
            <p>{community.description}</p>

            <div className="flex gap-2">
              <Button asChild>
                <Link href={`/${locale}/communities/${community.id}/tasks`}>
                  View Tasks
                </Link>
              </Button>

              <Button asChild>
                <Link href={`/${locale}/communities/${community.id}/posts`}>
                  View Posts
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}
