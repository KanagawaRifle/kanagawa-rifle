// packages/website/src/app/join/page.tsx

import { PageLayout } from '@/components/PageLayout';
import { PageLinks } from '@/components/PageLinks';
import { paths } from '@/config/paths';
import { MembershipApplication } from '@/features/membership/components/MembershipApplication';
import { MembershipFees } from '@/features/membership/components/MembershipFees';
import { createPageMetadata } from '@/lib/metadata';

const currentPath = paths.main.join;
export const metadata = createPageMetadata({
  title: currentPath.title,
  description: currentPath.description,
  path: currentPath.getHref(),
});

export default function Page() {
  return (
    <PageLayout
      title={currentPath.title}
      page={{ path: currentPath.getHref(), description: currentPath.description }}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      <p>{currentPath.description}</p>
      <MembershipApplication />
      <MembershipFees />
      <PageLinks pages={[paths.sub.forms, paths.main.competitions, paths.main.about]} />
    </PageLayout>
  );
}
