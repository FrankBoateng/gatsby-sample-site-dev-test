import { useLocation } from "@reach/router"

// A custom hook that builds on useLocation to parse
// the query string for you.
export const useQuery = queryParam => {
  const search = new URLSearchParams(useLocation().search)
  return search.get(queryParam)
}
