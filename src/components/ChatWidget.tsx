import { useEffect } from "react";

const ChatWidget = () => {
  useEffect(() => {
    // Only load chat widget on homepage
    const script = document.createElement("script");
    script.src = "https://widgets.leadconnectorhq.com/loader.js";
    script.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
    script.setAttribute("data-widget-id", "695bc7fa3a2b4b53cc76b53b");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      script.remove();
      // Remove any chat widget elements
      const chatElements = document.querySelectorAll('[class*="lc_chat"], [id*="lc_chat"]');
      chatElements.forEach(el => el.remove());
    };
  }, []);

  return null;
};

export default ChatWidget;
