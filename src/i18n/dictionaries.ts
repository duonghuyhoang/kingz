export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
};

export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  org: string;
  description: string;
  kind: "work" | "education";
}

const en = {
  meta: {
    description:
      "Portfolio of Duong Huy Hoang (KingZ) — full-stack developer working with React, Next.js, TypeScript and NestJS.",
    ogTagline: "Full-stack developer",
  },
  nav: {
    label: "Main",
    home: "Home",
    about: "About me",
    skills: "Skills",
    experience: "Experience",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToTop: "back to top",
  },
  common: {
    skipToContent: "Skip to content",
    copied: "Copied!",
    copy: "Copy",
    scrollToTop: "Scroll back to top",
  },
  hero: {
    badge: "👋 Greetings",
    role: "Full-stack developer",
    tagline:
      "— building interfaces with React and Next.js, and the services behind them with NestJS.",
    letsTalk: "Let's talk",
    downloadCv: "Download CV",
    dragHint: "Drag to rotate the planet",
    portraitAlt: "Portrait of Duong Huy Hoang",
  },
  about: {
    badge: "🧐 About me",
    label: "About me",
    intro: "👋 My name is Duong Huy Hoang — you can call me KingZ.",
    highlights: [
      {
        emoji: "💻",
        text: "More than 6 months of interface development and programming with JavaScript, React JS and TypeScript.",
      },
      {
        emoji: "🎓",
        text: "Studying Information Technology at the University of Mining and Geology.",
      },
      {
        emoji: "💡",
        text: "Front-end with React and Next.js, back-end with NestJS.",
      },
      {
        emoji: "🚀",
        text: "Every day, try to be a little better than yesterday.",
      },
    ],
  },
  skills: {
    badge: "🧑‍💻 Skills · Experience",
    label: "Skills and experience",
    heading: "Technologies and skills",
    lede: "The stack I reach for day to day, from the browser down to the container.",
    frontend: "Front end",
    backend: "Back end",
  },
  experience: {
    badge: "🗓 Journey",
    label: "Experience and education",
    heading: "Where I've been",
    lede: "Study, practice and the projects in between.",
    entries: [
      {
        id: "frontend-practice",
        period: "2023 — now",
        title: "Front-end development",
        org: "Self-directed and freelance work",
        description:
          "Six months and counting building interfaces with JavaScript, React and TypeScript, then moving into Next.js and NestJS on the server side.",
        kind: "work",
      },
      {
        id: "university",
        period: "In progress",
        title: "Information Technology",
        org: "University of Mining and Geology",
        description:
          "Undergraduate studies covering algorithms, databases and software engineering fundamentals.",
        kind: "education",
      },
    ] satisfies TimelineEntry[],
  },
  contact: {
    badge: "📬 Contact",
    label: "Contact",
    heading: "Let's talk",
    lede: "Open to internships, junior roles and freelance work. Email or call — whichever suits you.",
    sendEmail: "Send me an email",
    email: "E-mail",
    phone: "Phone",
    emailLabel: "email address",
    phoneLabel: "phone number",
  },
  footer: {
    copyright: "Copyright ©",
  },
};

const vi: typeof en = {
  meta: {
    description:
      "Portfolio của Dương Huy Hoàng (KingZ) — lập trình viên full-stack với React, Next.js, TypeScript và NestJS.",
    ogTagline: "Lập trình viên full-stack",
  },
  nav: {
    label: "Chính",
    home: "Trang chủ",
    about: "Về tôi",
    skills: "Kỹ năng",
    experience: "Kinh nghiệm",
    contact: "Liên hệ",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    backToTop: "về đầu trang",
  },
  common: {
    skipToContent: "Tới nội dung chính",
    copied: "Đã chép!",
    copy: "Chép",
    scrollToTop: "Cuộn về đầu trang",
  },
  hero: {
    badge: "👋 Xin chào",
    role: "Lập trình viên full-stack",
    tagline:
      "— dựng giao diện bằng React và Next.js, và các service phía sau bằng NestJS.",
    letsTalk: "Trò chuyện nhé",
    downloadCv: "Tải CV",
    dragHint: "Kéo để xoay hành tinh",
    portraitAlt: "Ảnh chân dung Dương Huy Hoàng",
  },
  about: {
    badge: "🧐 Về tôi",
    label: "Về tôi",
    intro: "👋 Tôi là Dương Huy Hoàng, bạn có thể gọi tôi là KingZ.",
    highlights: [
      {
        emoji: "💻",
        text: "Hơn 6 tháng làm giao diện và lập trình với JavaScript, React JS và TypeScript.",
      },
      {
        emoji: "🎓",
        text: "Đang học ngành Công nghệ thông tin tại Đại học Mỏ - Địa chất.",
      },
      {
        emoji: "💡",
        text: "Front-end với React và Next.js, back-end với NestJS.",
      },
      {
        emoji: "🚀",
        text: "Mỗi ngày cố gắng tốt hơn hôm qua một chút.",
      },
    ],
  },
  skills: {
    badge: "🧑‍💻 Kỹ năng · Kinh nghiệm",
    label: "Kỹ năng và kinh nghiệm",
    heading: "Công nghệ và kỹ năng",
    lede: "Bộ công cụ tôi dùng hằng ngày, từ trình duyệt xuống tới container.",
    frontend: "Front end",
    backend: "Back end",
  },
  experience: {
    badge: "🗓 Hành trình",
    label: "Kinh nghiệm và học vấn",
    heading: "Chặng đường đã qua",
    lede: "Việc học, việc làm và những dự án ở giữa.",
    entries: [
      {
        id: "frontend-practice",
        period: "2023 — nay",
        title: "Phát triển front-end",
        org: "Tự học và làm freelance",
        description:
          "Hơn sáu tháng dựng giao diện với JavaScript, React và TypeScript, sau đó mở rộng sang Next.js và NestJS ở phía server.",
        kind: "work",
      },
      {
        id: "university",
        period: "Đang học",
        title: "Công nghệ thông tin",
        org: "Đại học Mỏ - Địa chất",
        description:
          "Chương trình đại học với giải thuật, cơ sở dữ liệu và nền tảng kỹ thuật phần mềm.",
        kind: "education",
      },
    ] satisfies TimelineEntry[],
  },
  contact: {
    badge: "📬 Liên hệ",
    label: "Liên hệ",
    heading: "Trò chuyện nhé",
    lede: "Tôi đang tìm cơ hội thực tập, vị trí junior và công việc freelance. Email hay gọi điện đều được.",
    sendEmail: "Gửi email cho tôi",
    email: "E-mail",
    phone: "Điện thoại",
    emailLabel: "địa chỉ email",
    phoneLabel: "số điện thoại",
  },
  footer: {
    copyright: "Bản quyền ©",
  },
};

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, vi };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
