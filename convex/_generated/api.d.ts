/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as http from "../http.js";
import type * as mutations_affiliationsMutations from "../mutations/affiliationsMutations.js";
import type * as mutations_experienceMutations from "../mutations/experienceMutations.js";
import type * as mutations_skillsMutations from "../mutations/skillsMutations.js";
import type * as queries_affiliationsQueries from "../queries/affiliationsQueries.js";
import type * as queries_experienceQueries from "../queries/experienceQueries.js";
import type * as queries_skillsQueries from "../queries/skillsQueries.js";
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
  http: typeof http;
  "mutations/affiliationsMutations": typeof mutations_affiliationsMutations;
  "mutations/experienceMutations": typeof mutations_experienceMutations;
  "mutations/skillsMutations": typeof mutations_skillsMutations;
  "queries/affiliationsQueries": typeof queries_affiliationsQueries;
  "queries/experienceQueries": typeof queries_experienceQueries;
  "queries/skillsQueries": typeof queries_skillsQueries;
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
