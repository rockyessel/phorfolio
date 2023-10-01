import React from 'react';
import ProjectFeatureCard from '@/components/articles/feature-card';

const FeatureLists = () => {
  return (
    <div>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-col gap-2'>
          <div className='inline-flex items-center justify-between'>
            <p className='py-2 text-xl font-semibold'>Feature Projects</p>
            <button>Feature a project</button>
          </div>

          <section className='flex flex-col gap-4'>
            <ProjectFeatureCard />
            <ProjectFeatureCard />
            <ProjectFeatureCard />
          </section>
        </div>
      </div>
    </div>
  );
};

export default FeatureLists;
