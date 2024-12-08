import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title is required")
    .max(50, "Title must be at most 50 characters"),
  content: z.string().min(1, "Content is required"),
  images: z
    .array(
      z.object({
        data: z.instanceof(Buffer),
        mimeType: z.string().regex(/^image\/(jpeg|png|gif)$/, "Invalid MIME type"),
      })
    )
    .optional(),
  authorId: z.number().positive("Invalid author ID"),
});

export type BlogInput = z.infer<typeof blogSchema>;
