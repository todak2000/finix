/* eslint-disable import/no-extraneous-dependencies */
import type { FC } from 'react';

import { featureHeaders, featuresArr } from './constant';

const FeaturesSection: FC = () => {
  return (
    <section className="dark:inverted py-12" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="font-semibold tracking-wide">
            {featureHeaders.header}
          </h2>
          <p className="mt-2 text-lg font-extrabold leading-8 tracking-tight sm:text-xl">
            {featureHeaders.subHeader}
          </p>
          <p className="mt-4 max-w-2xl text-sm text-gray-500 lg:mx-auto">
            {featureHeaders.subText}
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {featuresArr.map((feature) => (
              <div
                key={feature.title}
                className="card relative flex flex-col items-center justify-center space-y-3 p-6"
              >
                {feature.icon}
                <p className="font-logo text-sm font-medium leading-6">
                  {feature.title}
                </p>
                <dd className="text-xs text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
