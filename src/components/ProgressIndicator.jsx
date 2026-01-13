import React from 'react';
import { Leaf } from 'lucide-react';

export default function ProgressIndicator({ current, total }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <Leaf
          key={index}
          className={`progress-leaf ${index < current ? 'active' : 'inactive'}`}
        />
      ))}
    </div>
  );
}
