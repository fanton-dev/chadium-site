import createNextIntlPlugin from 'next-intl/plugin';
import {withAxiom} from 'next-axiom';

const withNextIntl = createNextIntlPlugin('./app/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withAxiom(withNextIntl(nextConfig));