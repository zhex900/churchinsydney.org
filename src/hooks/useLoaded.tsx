import * as React from 'react';

// import { usePreloadState } from '@/context/PreloadContext';

export default function useLoaded() {
  // const preloaded = usePreloadState();
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 200);
  }, []);

  return isLoaded;
}
