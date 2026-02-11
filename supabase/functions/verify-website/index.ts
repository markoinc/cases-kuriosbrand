import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url || typeof url !== 'string') {
      console.log("Missing or invalid URL parameter");
      return new Response(
        JSON.stringify({ verified: false, message: "URL is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Normalize URL - add https:// if no protocol specified
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'https://' + normalizedUrl;
    }

    console.log(`Verifying website: ${normalizedUrl}`);

    // Create an AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(normalizedUrl, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; KuriosBot/1.0; +https://kurios.com)',
        },
      });

      clearTimeout(timeoutId);

      const statusCode = response.status;
      console.log(`Website response status: ${statusCode}`);

      // Accept 200-399 (success and redirects)
      if (statusCode >= 200 && statusCode < 400) {
        return new Response(
          JSON.stringify({ 
            verified: true, 
            status: statusCode,
            message: "Website verified successfully" 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        return new Response(
          JSON.stringify({ 
            verified: false, 
            status: statusCode,
            message: `Website returned status ${statusCode}` 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      const errorMessage = fetchError instanceof Error ? fetchError.message : 'Unknown error';
      console.log(`Fetch error: ${errorMessage}`);

      // Check if it was a timeout
      if (errorMessage.includes('abort') || errorMessage.includes('timeout')) {
        return new Response(
          JSON.stringify({ 
            verified: false, 
            message: "Website took too long to respond" 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // DNS or connection errors
      return new Response(
        JSON.stringify({ 
          verified: false, 
          message: "Could not connect to website" 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error("Error in verify-website function:", error);
    return new Response(
      JSON.stringify({ 
        verified: false, 
        message: "An error occurred while verifying the website" 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
