import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// MMT 精選方案卡（首頁「專業整合」區）
const programs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programs' }),
  schema: z.object({
    order: z.number().default(0),
    badge: z.string().default('MMT'),
    filter: z.string().default('filter-bachelor'),
    image: z.string(),
    title: z.string(),
    zodiac: z.string(),
    type: z.string(),
    description: z.string(),
    link: z.string().default('#'),
  }),
});

// 保險商品卡（保險頁 PRODUCTS 區）
const insuranceProducts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insurance-products' }),
  schema: z.object({
    order: z.number().default(0),
    icon: z.string(),
    tag: z.string(),
    title: z.string(),
    description: z.string(),
    features: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    featuredBadge: z.string().default('推薦'),
  }),
});

// 客戶見證卡（保險頁 TESTIMONIALS 區）
const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    order: z.number().default(0),
    avatar: z.string(),
    name: z.string(),
    role: z.string(),
    quote: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { programs, insuranceProducts, testimonials };
