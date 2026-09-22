import { SITE_URL } from "@/lib/site";

/* Structured data ให้ Google รู้จักชื่อ "พรรคคอนเน็กซ์" / "Connext Party" อย่างเป็นทางการ
   alternateName ช่วยให้ค้นด้วยคำสะกดแบบไหนก็เจอเว็บนี้ */
export default function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "พรรคคอนเน็กซ์",
    alternateName: [
      "Connext Party",
      "Connext",
      "คอนเน็กซ์",
      "พรรค Connext",
      "พรรคคอนเน็กซ์ Connext Party",
    ],
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-blue.png`,
    image: `${SITE_URL}/og.png`,
    description:
      "พรรคคอนเน็กซ์ (Connext Party) พรรคนักเรียนโรงเรียนตราษตระการคุณ ผู้นำพลังใหม่ สร้างสรรค์สิ่งดี สานต่อวัฒนธรรม ก้าวไกลด้วยเทคโนโลยีดิจิทัล",
    slogan: "ตราษฯ เป็นได้มากกว่านี้",
    memberOf: {
      "@type": "EducationalOrganization",
      name: "โรงเรียนตราษตระการคุณ",
      address: {
        "@type": "PostalAddress",
        addressLocality: "ตราด",
        addressCountry: "TH",
      },
    },
    sameAs: [
      "https://www.instagram.com/connext.party/",
      "https://www.facebook.com/share/1L5VBbTQHJ/",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "พรรคคอนเน็กซ์ Connext Party",
    alternateName: ["Connext", "คอนเน็กซ์", "Connext Party"],
    inLanguage: "th-TH",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organization, website]),
      }}
    />
  );
}
