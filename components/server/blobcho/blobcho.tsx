'use client';

import styles from './blobcho.module.css';
import { cn } from '@/lib/utils';

interface BlobchoProps {
  color: string;
}

export function Blobcho({ color }: BlobchoProps) {
  return (
    <div id="blobcho" className={styles.container}>
      <div
        className={cn(styles.blob, 'transition')}
        style={{
          background: color,
        }}
      />
    </div>
  );
}
