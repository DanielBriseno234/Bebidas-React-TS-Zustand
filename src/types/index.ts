import { z } from "zod";
import { CategoriesApiResponseSchema, DrinkApiResponseSchema, DrinksApiResponseSchema, RecipeAPIResponseSchema, SearchFiltersSchema } from "../utils/recipes-schema";

export type Categories = z.infer<typeof CategoriesApiResponseSchema>
export type SearchFilters = z.infer<typeof SearchFiltersSchema>
export type Drinks = z.infer<typeof DrinksApiResponseSchema>
export type Drink = z.infer<typeof DrinkApiResponseSchema>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>