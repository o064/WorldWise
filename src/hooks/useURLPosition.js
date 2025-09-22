import { useSearchParams } from "react-router-dom";

export function useURLPosition(){
    const [searchParams] = useSearchParams(); //hook to get data from query string
  const lng = searchParams.get("lng");
  const lat = searchParams.get("lat");
  return [lat,lng]
}