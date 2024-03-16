import { z } from 'zod';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { router } from 'next/client';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { createCommunity } from '@/components/api-client/community';
import { Button } from '@/components/ui/button';
import { FaSignInAlt } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { useState } from 'react';
import Image from 'next/image';

interface CreateCommunityFormProps {
  onCancel: () => void;
}

export function CreateCommunityForm({ onCancel }: CreateCommunityFormProps) {
  const t = useTranslations('components.client.create-community-dialog');
  const locale = useLocale();
  const [image, setImageUrl] = useState<string | undefined>(
    '/assets/images/logo/logo.png',
  );

  const config = {
    name: {
      minLength: 3,
      maxLength: 50,
    },
    description: {
      minLength: 3,
      maxLength: 1000,
    },
    color: {
      enum: {
        red: '#c43b3b',
        green: '#279527',
        blue: '#363699',
        yellow: '#b7b757',
        cyan: '#32baba',
        magenta: '#e369e3',
        purple: '#7a3e7a',
        orange: '#e37f3e',
      },
    },
  };

  const formSchema = z.object({
    name: z
      .string({
        required_error: t('is-required'),
      })
      .min(
        config.name.minLength,
        t('too-short', { length: config.name.minLength }),
      )
      .max(
        config.name.maxLength,
        t('too-long', { length: config.name.maxLength }),
      ),
    description: z
      .string({
        required_error: t('is-required'),
      })
      .min(
        config.description.minLength,
        t('too-short', { length: config.description.minLength }),
      )
      .max(
        config.description.maxLength,
        t('too-long', { length: config.description.maxLength }),
      ),
    color: z.enum(Object.values(config.color.enum) as [string, ...string[]], {
      required_error: t('is-required'),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      description: '',
      color: '#c43b3b',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await createCommunity(values.name, values.description);

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: response.error,
        description: t('try-again'),
      });
    } else {
      router.push(`/${locale}/communities/${response.id}`);
    }
  }

  return (
    <>
      {/* Banner */}
      <div className="relative w-full h-72 mt-4 overflow-ellipsis">
        {image && (
          <Image
            className="absolute inset-0 flex flex-col w-full h-full object-cover"
            src={image}
            alt="Community banner"
            width={1920}
            height={1080}
          />
        )}

        <div
          className="absolute inset-0 flex flex-col w-full h-full transition-opacity"
          style={{
            backgroundColor: form.watch('color'),
            opacity: image ? 0.2 : 1,
          }}
        />

        <div className="absolute inset-0 flex flex-col w-full h-full justify-center items-center text-center text-white transition-opacity">
          <span className="w-fit h-12 px-2 py-1 text-3xl font-bold bg-white text-black dark:bg-black dark:text-white">
            {form.watch('name')}
          </span>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-xl m-4 mx-auto"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('name')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('name-placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('name')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('description-placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t('color')}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-8 grid-rows-1 grid-flow-row space-y-1"
                  >
                    {Object.values(config.color.enum).map((color) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            className="w-16 h-16"
                            style={{ backgroundColor: color }}
                            value={color}
                          />
                        </FormControl>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button onClick={() => onCancel()} variant="secondary">
              <FaX className="mr-2 h-4 w-4" /> {t('cancel')}
            </Button>

            <Button type="submit">
              <FaSignInAlt className="mr-2 h-4 w-4" /> {t('submit')}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
