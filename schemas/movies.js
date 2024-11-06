import z from 'zod';

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required',
  }),
  year: z.number().int().positive().min(1900).max(2030),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: 'Poster must be a valid url',
  }),
  genre: z.array(z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']), {
    required_error: 'Movie genre is required.',
    invalid_type_error: 'Movie genre must be an array of enum Genre',
  }),
  rate: z.number().min(0).max(10).default(0),
});

export const validateMovie = (object) => {
  return movieSchema.safeParse(object);
};

export const validatePartialMovie = (object) => {
  return movieSchema.partial().safeParse(object);
};
