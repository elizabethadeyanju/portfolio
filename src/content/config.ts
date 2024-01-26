import { z, defineCollection } from "astro:content";
const blogSchema = z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    url: z.string().optional(),
    content: z.object({ html: z.string(), markdown: z.string(), text: z.string() }).optional(),
    coverImage: z.object({ url: z.string(), isPortrait: z.boolean() }).optional(),
    badge: z.string().optional(),
    slug: z.string().optional(),
    publishedAt: z.coerce.date().optional(), updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
        message: 'tags must be unique',
    }).optional(),
});

const storeSchema = z.object({
    title: z.string(),
    description: z.string(),
    custom_link_label: z.string(),
    custom_link: z.string().optional(),
    updatedDate: z.coerce.date(),
    pricing: z.string().optional(),
    oldPricing: z.string().optional(),
    badge: z.string().optional(),
    checkoutUrl: z.string().optional(),
    heroImage: z.string().optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;
export type StoreSchema = z.infer<typeof storeSchema>;

const blogCollection = defineCollection({ schema: blogSchema });
const storeCollection = defineCollection({ schema: storeSchema });

export const collections = {
    'blog': blogCollection,
    'store': storeCollection
}