import React from 'react';
import ContentLoader from 'react-content-loader';

export const WheelSkeleton = () => {

  return (
    <ContentLoader
      speed={2}
      width={500}
      height={500}
      viewBox="0 0 500 500"
      backgroundColor="#7bc6a7"
      foregroundColor="#2ab67d"
    >
      <circle cx="250" cy="250" r="250" />
    </ContentLoader>
    
  );
};
