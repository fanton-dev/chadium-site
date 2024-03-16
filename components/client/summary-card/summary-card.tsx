'use client';
import { Button } from '@/components/ui/button';
import { FaWandSparkles } from 'react-icons/fa6';
import { Card } from '@/components/ui/card';
import { getPostsSummary } from '@/components/api-client/ai';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface SummaryCardProps {
  posts: {
    id: number;
    title: string;
    description: string;
    imageUrls: string[];
  }[];
}

export default function SummaryCard({ posts }: SummaryCardProps) {
  const [generatedSummary, setGeneratedSummary] = useState<
    string | undefined
  >();
  const [loading, setLoading] = useState(false);

  async function generateSummary() {
    setLoading(true);
    const summary = await getPostsSummary(
      posts.map((post) => `[${post.title}] ${post.description}`),
    );
    console.log(summary);
    if (summary) {
      setGeneratedSummary(summary);
    }
    setLoading(false);
  }

  return (
    <Card className="absolute inset-0 flex flex-col h-fit mt-auto mb-2 mx-2 items-center gap-2 p-8 text-center">
      {loading && <Skeleton className="w-full h-20" />}
      {generatedSummary && (
        <ScrollArea className="w-full h-40">
          <p>{generatedSummary}</p>{' '}
        </ScrollArea>
      )}
      <h1 className="text-xl font-bold">
        Don't have time to read through everything?
      </h1>
      <p>You can generated an automated summary of all recent posts!</p>
      <Button onClick={() => generateSummary()} disabled={!!generatedSummary}>
        <FaWandSparkles className="w-4 h-4 mr-2" />
        Generate Summary
      </Button>
    </Card>
  );
}
