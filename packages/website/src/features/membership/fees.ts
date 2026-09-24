type MembershipFees = {
  title: string;
  name: string;
  description: string;
  note?: string;
  both: readonly [number, number, number];
  local: readonly [number, number, null];
  nationalAdmission: number;
  localAdmission: number;
  nationalAnnual: number;
  localAnnual: number;
  transfer: number;
};

// Published amounts are editorial data. Do not infer eligibility or calculate new fee policies.
export const membershipFees = [
  {
    title: '一般の方',
    name: '一般',
    description: '4月1日時点で24歳以上の学生を含む。',
    both: [30000, 20000, 25500],
    local: [15000, 10000, null],
    nationalAdmission: 5000,
    localAdmission: 5000,
    nationalAnnual: 10000,
    localAnnual: 10000,
    transfer: 500,
  },
  {
    title: '学生（大学・専門学校）の方',
    name: '学生',
    description: '大学生・専門学校生。',
    note: 'ご入会時に学生証等所属を証明できる書類をお送りください。',
    both: [8000, 6000, 7500],
    local: [4000, 3000, null],
    nationalAdmission: 1000,
    localAdmission: 1000,
    nationalAnnual: 3000,
    localAnnual: 3000,
    transfer: 500,
  },
  {
    title: '生徒（高校生以下）の方',
    name: '生徒',
    description: '高校生以下。',
    both: [5500, 4000, 5500],
    local: [4000, 3000, null],
    nationalAdmission: 500,
    localAdmission: 1000,
    nationalAnnual: 1000,
    localAnnual: 3000,
    transfer: 500,
  },
] as const satisfies readonly MembershipFees[];

export const membershipTransitions = [
  {
    title: '新大学生（4月1日～）',
    rows: [
      { description: '神ラ生徒会員→学生会員', membership: '日ラ＋神ラ更新', amount: 6500 },
      { description: '神ラ→学連へ所属移籍', membership: '神ラのみ更新', amount: 3000 },
      { description: '他所属加盟団体→神ラへ新規移籍', membership: '日ラ更新＋神ラ新規', amount: 7500 },
    ],
  },
  {
    title: '新社会人（4月1日～）',
    rows: [
      { description: '神ラ学生・生徒会員→一般会員', membership: '日ラ＋神ラ更新', amount: 20500 },
      { description: '学連→神ラへ所属移籍', membership: '日ラ＋神ラ更新', amount: 20500 },
      { description: '他所属加盟団体→神ラへ新規移籍', membership: '日ラ更新＋神ラ新規', amount: 25500 },
    ],
  },
] as const;
