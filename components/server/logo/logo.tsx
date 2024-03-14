import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export function Logo(props: HTMLAttributes<HTMLDivElement>) {
  // eslint-disable-next-line react/prop-types
  const { className, ...otherProps } = props;
  return (
    <div
      className={cn('flex w-fit items-center gap-1.5', className)}
      {...otherProps}
    >
      {/*<Image*/}
      {/*  src="/assets/icons/sugaming.png"*/}
      {/*  alt="CHADIUM Logo"*/}
      {/*  width={32}*/}
      {/*  height={32}*/}
      {/*/>*/}
      <span className="text-xl font-bold">CHADIUM</span>
    </div>
  );
}
