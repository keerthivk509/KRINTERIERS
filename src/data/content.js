// Static copy (mirrors the template). Replace with KR Interior copy.
const F = (id, w = 1000, ext = "jpg") =>
  `https://framerusercontent.com/images/${id}.${ext}?width=${w}`;
export const content = {
  hero: {
    title: "Crafted for modern living",
    text: "Thoughtfully designed furniture that brings warmth, comfort, and character into every room.",
    cta: "Get in touch",
    slides: [
      F("oVf8mP1IQbYQqBAL3mfw74IK8W8", 1400),
      F("BoDSH0ooQXlngYN7PhPBrCLvcXY", 1400),
      F("JHjUSXzHnw9DvPMME1DJE7xAkg4", 1400),
      F("gqE07x54ygCqIynDqzkupyTjv0", 1400),
    ],
    floats: [
      F("1gcot0z6VCCHC3WtAYoQtOES2E", 400, "png"),
      F("JgxoHoQfd0pM0ivxSdsbwzsgY9o", 500, "png"),
      F("kumhGeCkzUxmLtxi8ORCvGzcSg4", 400, "png"),
    ],
  },
  marquee: [
    {
      title: "Residential Design",
      description: "Stylish, comfortable homes tailored to your lifestyle.",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
      icon: "bi-house",
    },
    {
      title: "Commercial Design",
      description: "Functional, inspiring offices and business spaces.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
      icon: "bi-building",
    },
    {
      title: "Modular Kitchen",
      description: "Beautiful and efficient kitchens for everyday living.",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
      icon: "bi-grid",
    },
    {
      title: "Renovation",
      description: "Give your existing space a fresh, considered look.",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
      icon: "bi-arrow-repeat",
    },
  ],
  about: {
    title: "Designed for homes that feel like home",
    text: "Trusted by homeowners, designers, and modern spaces worldwide.",
  },
  stats: [
    ["Client served", 1200, "+"],
    ["Awards won", 24, "+"],
    ["Project rating", 98, "%"],
    ["Projects completed", 350, "+"],
    ["Years of experience", 12, "+"],
  ],
  showcase: { title: "Everything we make, in one place" },
  categories: {
    title: "Find your perfect space",
    text: "Thoughtfully designed pieces made for living, resting, working, and everything in between.",
  },
  gallery: {
    title: "Made for every moment",
    text: "From relaxed lounging to everyday dining, discover thoughtfully crafted pieces designed for comfort, character, and lasting style.",
  },
  team: {
    title: "Designed by people who care",
    text: "Our designers, craftspeople, and makers work together to create furniture that feels considered, comfortable, and built to last.",
    people: [
      [
        "Alex Morgan",
        "Creative Director",
        F("mZMnn33EDwKiItWhAXuyzXtEnE", 800),
      ],
      [
        "Daniel Carter",
        "Furniture Designer",
        F("K4BpyRgwJjnqRkKKB8DkdrrjnTo", 800),
      ],
      [
        "Ryan Mitchell",
        "Materials Specialist",
        F("ZpbS5jjQtwnJ5P1RmbTO6sEuXU", 800),
      ],
    ],
  },
  reviews: {
    title: "Loved by the people who sit in them",
    text: "From everyday comfort to timeless design, our pieces are made to become part of your home.",
    items: [
      [
        "Sophia Bennett",
        "Marketing Lead",
        "The piece looks incredible in our living room and is surprisingly comfortable. The quality feels premium without being overdone.",
      ],
      [
        "Ava Mitchell",
        "Operations Manager",
        "Simple, comfortable, and beautifully made. It fits perfectly around our dining table.",
      ],
      [
        "Noah Foster",
        "Sales Manager",
        "Delivery was smooth and the finish is exactly what we hoped for.",
      ],
      [
        "Alex Carter",
        "Product Manager",
        "Easily the most considered furniture we have bought.",
      ],
      [
        "James Parker",
        "IT Specialist",
        "Solid, calm, and well made. We get compliments all the time.",
      ],
    ],
  },
  faqs: [
    [
      "What types of furniture do you offer?",
      "We create thoughtfully designed seating, tables, and bedroom pieces for modern interiors.",
    ],
    [
      "Can I order furniture online?",
      "Yes. Send an enquiry and our team will confirm availability and delivery.",
    ],
    [
      "Do you offer different materials and finishes?",
      "Yes, most pieces come in several woods, fabrics, and finishes.",
    ],
    [
      "How long does delivery take?",
      "Most orders arrive within two to four weeks, depending on the piece.",
    ],
    [
      "Can I request fabric or material samples?",
      "Yes. Tell us what you are considering and we will send samples.",
    ],
  ],
  contact: {
    title: "Let’s find the piece that feels like you.",
    text: "Tell us what you’re looking for and our team will help you find the right piece, material, and finish for your space.",
  },
  footer: {
    address: "476 Della Street, New York City",
    phone: "(761) 999 8576",
    email: "hello@KR Interior.com",
  },
  blbo: [
    {
      title: "Bedroom Interior Design",
      subtitle: "Comfortable and elegant bedroom spaces.",
      parent: "Interior Design",
      content: "<p>Explore our custom bedroom interior solutions.</p>",
      image: "/images/bedroom-banner.jpg",
      images: [
        {
          url: "/images/bedroom-1.jpg",
          title: "Luxury Bedroom",
          content: "A modern bedroom with elegant finishes.",
        },
      ],
    },
  ],
};
