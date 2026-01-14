/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as affiliationQueries from "../affiliationQueries.js";
import type * as affiliations from "../http.js";
import type * as functions_affiliations from "../functions/affiliations.js";
import type * as tables_affiliationsTable from "../tables/affiliationsTable.js";
import type * as tables_experienceTable from "../tables/experienceTable.js";
import type * as tables_projectsTable from "../tables/projectsTable.js";
import type * as tables_skillsTable from "../tables/skillsTable.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  affiliationQueries: typeof affiliationQueries;
  affiliations: typeof affiliations;
  "functions/affiliations": typeof functions_affiliations;
  "tables/affiliationsTable": typeof tables_affiliationsTable;
  "tables/experienceTable": typeof tables_experienceTable;
  "tables/projectsTable": typeof tables_projectsTable;
  "tables/skillsTable": typeof tables_skillsTable;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
