import { useState, useEffect } from "react";

interface GeoData {
  state: string | null;
  stateCode: string | null;
  loading: boolean;
}

export const useGeoLocation = (): GeoData => {
  const [geoData, setGeoData] = useState<GeoData>({
    state: null,
    stateCode: null,
    loading: true,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Using ipapi.co (free, CORS-enabled)
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        
        if (data.region) {
          setGeoData({
            state: data.region,
            stateCode: data.region_code,
            loading: false,
          });
        } else {
          setGeoData({ state: null, stateCode: null, loading: false });
        }
      } catch (error) {
        console.error("Geolocation fetch failed:", error);
        setGeoData({ state: null, stateCode: null, loading: false });
      }
    };

    fetchLocation();
  }, []);

  return geoData;
};
