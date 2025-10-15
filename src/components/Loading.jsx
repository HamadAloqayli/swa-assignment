import { useState, useEffect } from "react";
import logo from "../assets/swa_logo.png";

const Loading = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (2-3 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <img
        src={logo}
        alt="SWA Logo"
        className="h-48 w-48 object-contain animate-pulse"
      />
    </div>
  );
};

export default Loading;
