export type Policy = {
  title: string;
  image: string; // รูป 4:5 ที่ public/images/policies/policy-1.png ...
  description: string;
  benefits: string[];
};

export const policies: Policy[] = [
  {
    title: "นโยบายตัวอย่าง 1",
    image: "/images/policies/policy-1.png",
    description:
      "คำอธิบายนโยบาย — สรุปว่านโยบายนี้คืออะไร ทำอะไร แก้ปัญหาอะไรให้นักเรียน และจะลงมือทำอย่างไร (แก้ข้อความนี้ใน lib/data/policies.ts)",
    benefits: [
      "ข้อดี/ประโยชน์ ข้อที่ 1",
      "ข้อดี/ประโยชน์ ข้อที่ 2",
      "ข้อดี/ประโยชน์ ข้อที่ 3",
    ],
  },
];
