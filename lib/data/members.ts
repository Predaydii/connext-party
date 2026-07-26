export type Member = {
  id: string;
  image: string;
};

export type ClassGroup = {
  className: string;
  members: Member[];
};

// รูป 4:5 (1080x1350) ที่ public/images/members/member-{ห้อง}-{ลำดับ}.png
// เช่น member-1-1.png = ม.5/1 คนที่ 1, member-7-3.png = ม.5/7 คนที่ 3
// กลุ่ม "ระดับชั้นอื่น" ใช้เลขห้อง 0 (member-0-1.png ...)
const makeMembers = (room: string, count: number): Member[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `m${room}-${i + 1}`,
    image: `/images/members/member-${room}-${i + 1}.png`,
  }));

export const classGroups: ClassGroup[] = [
  { className: "ม.5/1", members: makeMembers("1", 2) },
  { className: "ม.5/2", members: makeMembers("2", 6) },
  { className: "ม.5/3", members: makeMembers("3", 2) },
  { className: "ม.5/4", members: makeMembers("4", 6) },
  { className: "ม.5/7", members: makeMembers("7", 8) },
  { className: "ระดับชั้นอื่น", members: makeMembers("0", 2) },
];
