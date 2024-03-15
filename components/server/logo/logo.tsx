import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import Image from 'next/image';

export function Logo(props: HTMLAttributes<HTMLDivElement>) {
  // eslint-disable-next-line react/prop-types
  const { className, ...otherProps } = props;
  return (
    <div
      className={cn('flex w-fit items-center gap-1.5', className)}
      {...otherProps}
    >
      <Image
        src="/assets/images/logo/logo.png"
        alt="CHADIUM Logo"
        width={42}
        height={42}
      />
      <span className="text-2xl font-bold">CHADIUM</span>
    </div>
  );
}
