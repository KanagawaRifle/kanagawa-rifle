// packages/website/src/app/join/page.tsx

import { PageLayout } from '@/components/PageLayout';
import { paths } from '@/config/paths';
import { MembershipApplication } from '@/features/membership/components/MembershipApplication';
import { MembershipFees } from '@/features/membership/components/MembershipFees';
import { createPageMetadata } from '@/lib/metadata';

const currentPath = paths.main.join;
export const metadata = createPageMetadata({
  title: '入会案内・会費',
  description: currentPath.description,
  path: currentPath.getHref(),
});

export default function Page() {
  return (
    <PageLayout
      title={currentPath.name}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      <MembershipApplication />
      <MembershipFees />
    </PageLayout>
  );
}
