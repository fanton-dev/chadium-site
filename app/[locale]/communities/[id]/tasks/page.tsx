import { Card } from '@/components/ui/card';
import { PostCard } from '@/components/server/post-card/post-card';

export default async function PostsPage() {
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
        <div className="hidden xl:flex h-full flex-col text-white bg-zinc-900">
          gosho
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
