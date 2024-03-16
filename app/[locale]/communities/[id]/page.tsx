import { Card } from '@/components/ui/card';
import Image from 'next/image';

export default async function CommunityPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <Card className="relative grid min-h-[80vh] my-auto w-5/6 md:w-2/3 flex-col items-center justify-center xl:grid-cols-2 xl:px-0 overflow-hidden">
        <Image src="" alt="" className="w-full h-full" />
      </Card>
    </div>
  );
}
