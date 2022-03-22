import React from 'react';
import ContentLoader from 'react-content-loader';

export const WheelSkeleton = () => (
  <ContentLoader 
    speed={1.2}
    width={600}
    height={600}
    viewBox="0 0 600 600"
    backgroundColor="#7bc6a7"
    foregroundColor="#2ab67d"
  >
    <circle cx="300" cy="300" r="300" />
  </ContentLoader>
);