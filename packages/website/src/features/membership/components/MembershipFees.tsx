import type { ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { membershipFees, membershipTransitions } from '../fees';

const formatAmount = (amount: number | null) => (amount === null ? '―' : `${amount.toLocaleString('ja-JP')}円`);

const membershipActions = [
  { name: '新規', description: 'これから新しく入会される方。' },
  { name: '更新', description: '神ラに既にご入会されている方。' },
  {
    name: '移籍',
    description: '神ラに入会されていない方で、学連や他都道府県団体から日ラ所属団体を神ラに変更される方。',
  },
];

const membershipHeaders = membershipActions.map((action) => (
  <>
    <span className="font-bold">{action.name}</span>
    <p className="mt-2 text-xs">{action.description}</p>
  </>
));

function FeeTable({ label, headers, children }: { label: string; headers: ReactNode[]; children: ReactNode }) {
  return (
    <div
      className="defer-render overflow-x-auto [contain-intrinsic-block-size:auto_400px]"
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      <table className="w-full min-w-[32rem] table-fixed text-center">
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr className="border-border border-b">
            <td />
            {headers.map((header, index) => (
              <th key={index} scope="col" className="odd:bg-muted px-4 py-2 align-top font-normal">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function FeeRow({ label, amounts }: { label: ReactNode; amounts: readonly (number | null)[] }) {
  return (
    <tr className="border-border border-b">
      <th scope="row" className="px-4 py-2 font-normal">
        {label}
      </th>
      {amounts.map((amount, index) => (
        <td key={index} className="odd:bg-muted px-4 py-2">
          {formatAmount(amount)}
        </td>
      ))}
    </tr>
  );
}

function National() {
  return <span className="font-bold text-red-600 dark:text-red-400">日ラ</span>;
}

function Local() {
  return <span className="font-bold text-green-700 dark:text-green-400">神ラ</span>;
}

export function MembershipFees() {
  return (
    <>
      {membershipFees.map((fees) => (
        <Card key={fees.name}>
          <CardHeader>
            <CardTitle>{fees.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {'note' in fees && <p className="mb-2">{fees.note}</p>}
            <FeeTable label={`${fees.title}の会費`} headers={membershipHeaders}>
              <FeeRow
                label={
                  <>
                    <National />＋<Local />
                  </>
                }
                amounts={fees.both}
              />
              <FeeRow
                label={
                  <>
                    <Local />
                    のみ
                  </>
                }
                amounts={fees.local}
              />
            </FeeTable>
          </CardContent>
        </Card>
      ))}
      <Card>
        <CardHeader>
          <CardTitle>ご進学・ご就職される皆様へ</CardTitle>
        </CardHeader>
        <CardContent>
          {membershipTransitions.map((transition) => (
            <table key={transition.title} className="w-full">
              <caption className="border-border bg-muted rounded-md border p-2 text-left text-sm font-bold">
                {transition.title}
              </caption>
              <tbody>
                {transition.rows.map((row) => (
                  <tr key={row.description} className="border-border border-b last:border-b-0">
                    <th scope="row" className="px-4 py-2 text-left font-normal">
                      {row.description}
                      <br />
                      {row.membership}
                    </th>
                    <td className="p-2 text-center whitespace-nowrap">{formatAmount(row.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>入会金・年会費一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <FeeTable
            label="入会金・年会費一覧"
            headers={membershipFees.map((fees) => (
              <>
                <span className="font-bold">{fees.name}</span>
                <p className="mt-2 text-xs">{fees.description}</p>
              </>
            ))}
          >
            <FeeRow
              label={
                <>
                  <span className="font-bold text-red-600 dark:text-red-400">日</span>　　本
                  <br />
                  <span className="font-bold text-red-600 dark:text-red-400">ラ</span>入会金
                </>
              }
              amounts={membershipFees.map((fees) => fees.nationalAdmission)}
            />
            <FeeRow
              label={
                <>
                  <span className="font-bold text-green-700 dark:text-green-400">神</span>奈川県
                  <br />
                  <span className="font-bold text-green-700 dark:text-green-400">ラ</span>入会金
                </>
              }
              amounts={membershipFees.map((fees) => fees.localAdmission)}
            />
            <FeeRow
              label={
                <>
                  <span className="font-bold text-red-600 dark:text-red-400">日</span>　　本
                  <br />
                  <span className="font-bold text-red-600 dark:text-red-400">ラ</span>年会費
                </>
              }
              amounts={membershipFees.map((fees) => fees.nationalAnnual)}
            />
            <FeeRow
              label={
                <>
                  <span className="font-bold text-green-700 dark:text-green-400">神</span>奈川県
                  <br />
                  <span className="font-bold text-green-700 dark:text-green-400">ラ</span>年会費
                </>
              }
              amounts={membershipFees.map((fees) => fees.localAnnual)}
            />
            <FeeRow label="移籍料" amounts={membershipFees.map((fees) => fees.transfer)} />
          </FeeTable>
        </CardContent>
      </Card>
    </>
  );
}
