import type { NextConfig } from "next";
import { AIRAC_META } from './src/data/airac-meta.js';

if (new Date() >= new Date(AIRAC_META.next_iso)) {
  throw new Error(
    `\n\n⚠  AIRAC cycle ${AIRAC_META.cycle} expired on ${AIRAC_META.next}.\n` +
    `   Update AIRAC_META in src/data/airac-meta.js before building.\n`
  );
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
