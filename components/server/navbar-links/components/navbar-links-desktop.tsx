'use client';

import React from 'react';
import Link from 'next/link';
import { NavbarDropdown } from './navbar-dropdown';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Badge } from '@/components/ui/badge';

interface NavbarLinksDesktopProps {
  className: string;
  links: {
    title: string;
    href: string;
    badge?: string;
    links?: {
      isFeatured: boolean;
      title: string;
      description: string;
      href: string;
    }[];
  }[];
}

export function NavbarLinksDesktop({
  className,
  links,
}: NavbarLinksDesktopProps) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {links.map((link) => (
          <NavigationMenuItem key={link.title}>
            {link.links ? (
              <Link href={link.href}>
                <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
              </Link>
            ) : (
              <NavigationMenuLink
                href={link.href}
                className={navigationMenuTriggerStyle()}
              >
                {link.title}
                {link.badge && (
                  <Badge variant="secondary" className="ml-1.5">
                    {link.badge}
                  </Badge>
                )}
              </NavigationMenuLink>
            )}
            {link.links && <NavbarDropdown link={link} />}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
