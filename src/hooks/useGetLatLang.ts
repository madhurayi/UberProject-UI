export const useGetLatLang = ()=>{
    
    
    const getLatLng =async (address: string)=> {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        address
      )}&key=${import.meta.env.VITE_OPEN_CAGE_API_KEY}`
    );
    const data = await res.json();

    return data?.results[0]?.geometry;
  }

  return {getLatLng};
} 