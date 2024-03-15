'use client';

import { z } from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import { CgSpinnerAlt } from 'react-icons/cg';
import { FaDiscord, FaGoogle } from 'react-icons/fa6';
import { FaSignInAlt } from 'react-icons/fa';
import * as process from 'process';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LoginForm() {
  const t = useTranslations('components.client.login-form');

  const formSchema = z.object({
    email: z.string().email({
      message: t('invalid-email-format'),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIsLoading(false);
  }

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input placeholder="gosho@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            <FaSignInAlt className="mr-2 h-4 w-4" /> {t('submit')}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t('or-continue-with')}
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading} asChild>
        <Link
          href={`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login/discord`}
        >
          {isLoading ? (
            <CgSpinnerAlt className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaDiscord className="mr-2 h-4 w-4" />
          )}
          Discord
        </Link>
      </Button>{' '}
      <Button variant="outline" type="button" disabled={isLoading} asChild>
        <Link
          href={`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login/discord`}
        >
          {isLoading ? (
            <CgSpinnerAlt className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaGoogle className="mr-2 h-4 w-4" />
          )}
          Google
        </Link>
      </Button>
    </>
  );
}
