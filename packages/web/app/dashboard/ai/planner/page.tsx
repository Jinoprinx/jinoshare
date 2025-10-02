import { Suspense } from 'react';
import PlannerPageClient from './PlannerPageClient';

export default function ContentPlannerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlannerPageClient />
    </Suspense>
  );
}
