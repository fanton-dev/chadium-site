import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

interface PostCardProps {
  post: {
    title: string;
    description: string;
    imageUrls: string[];
  };
}
export async function PostCard({ post }: PostCardProps) {
  return (
    <Card className="w-full transition hover:shadow-xl">
      {post.imageUrls.length > 0 && (
        <CardHeader className="relative p-0 w-full aspect-video space-y-0 overflow-hidden rounded-t-xl justify-center items-center flex">
          <Carousel
            className="w-full max-w-xs"
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent>
              {post.imageUrls.map((imageUrl, index) => (
                <CarouselItem key={index}>
                  <Card className="w-full h-full">
                    <CardContent className="flex w-full h-full items-center justify-center">
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        width={800}
                        height={800}
                        className="object-cover w-full h-full"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="z-20" />
            <CarouselNext className="z-20" />
          </Carousel>
        </CardHeader>
      )}
      <CardContent className="flex flex-col gap-y-2 p-3">
        <div>
          <h2 className="text-lg font-bold text-ellipsis overflow-hidden">
            {post.title}
          </h2>
          <ScrollArea className="max-h-40 w-full">
            <p className="w-full">{post.description}</p>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
