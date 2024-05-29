// SkeletonLoader.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader: React.FC = () => {
  return (
    <div>
      <Skeleton height={40} width={300} />
      <Skeleton height={20} width={200} />
      <Skeleton height={20} width={200} />
      <Skeleton height={20} width={200} />
    </div>
  );
};

export default SkeletonLoader;
