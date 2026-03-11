export const companyInfo = {
  name: "Pingintrip",
  legalName: "PT. Pingintrip Indonesia",
  address:
    "Jl. Rengganis Raya, Bajur, Kec. Labuapi, Kabupaten Lombok Barat, Nusa Tenggara Bar. 83361",
  email: "rezzalombok@gmail.com",
  phone: "+62 877 2173 6047",
  phoneFormatted: "+62 877-2173-6047",
  logo: "/logo/pingintrip-logo.webp",
  logoWhite: "/logo/pingintrip-logo.webp", // update if separate white logo exists
  founded: 2013,
};

export const socialLinks = [
  {
    name: "Facebook",
    url: "https://facebook.com/pingintrip",
    icon: "facebook",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/pingintrip",
    icon: "instagram",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@pingintrip",
    icon: "youtube",
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/@pingintrip",
    icon: "tiktok",
  },
];

export const footerNavColumns = {
  company: {
    links: [
      {label: "About Us", href: "/about"},
      {label: "Contact", href: "/contact"},
      {label: "Careers", href: "/careers"},
      {label: "Press Room", href: "/press"},
    ],
  },
  information: {
    links: [
      {label: "FAQ", href: "/faq"},
      {label: "Booking Conditions", href: "/terms"},
      {label: "Privacy Policy", href: "/privacy"},
      {label: "Travel Insurance", href: "/insurance"},
    ],
  },
  destinations: {
    links: [
      {label: "Bali", href: "/destinations/bali"},
      {label: "Lombok", href: "/destinations/lombok"},
      {label: "Komodo Island", href: "/destinations/komodo"},
      {label: "Sumba", href: "/destinations/sumba"},
      {label: "East Java", href: "/destinations/east-java"},
      {label: "Central Java", href: "/destinations/central-java"},
    ],
  },
};
