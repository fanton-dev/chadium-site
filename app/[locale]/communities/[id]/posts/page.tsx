import { Card } from '@/components/ui/card';
import { PostCard } from '@/components/server/post-card/post-card';
import { getCommunity } from '@/components/api-client/community';
import SummaryCard from '@/components/client/summary-card/summary-card';

interface PostsPageProps {
  params: { id: string };
}

export default async function PostsPage({ params }: PostsPageProps) {
  const community = await getCommunity(params.id);
  const posts = [
    {
      id: 1,
      title: 'Спрете да си изхвърляте боклука пред входа на съседите!',
      description: '',
      imageUrls: [
        'https://fmicodes.com/assets/icons/fmicodes.svg',
        'https://fmicodes.com/assets/icons/fmicodes.svg',
      ],
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <Card className="grid min-h-[80vh] my-auto w-5/6 md:w-2/3 flex-col items-center justify-center xl:grid-cols-2 xl:px-0 overflow-hidden">
        <div className="hidden xl:flex relative h-full flex-col text-white bg-zinc-900">
          <img
            src={community.image}
            alt={community.name}
            className="absolute inset-0 w-full h-full object-cover blur-sm"
          />
          <SummaryCard posts={posts} />
        </div>

        <div className="p-8 h-full">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </Card>
    </div>
  );
}
