// components/HowItWorks.tsx
import type React from 'react';

import { key } from '@/lib/helpers/uniqueKey';

import { cardArr } from './constant';

const HowItWorks: React.FC = () => {
  return (
    <section className="dark:inverted py-12" id="how">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center font-bold">How It Works</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {cardArr.map((item) => {
            return (
              <div key={key()} className="card rounded-lg p-6">
                <h5 className="mb-4 font-semibold">{item.header}</h5>
                <p className="text-xs">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
