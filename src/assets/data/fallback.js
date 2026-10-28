// Dev fallback used only when KR InteriorCMS is unreachable or empty.
// Images are the template's demo images: replace with your own before launch.
const I = (id, ext = "jpg") =>
  `https://framerusercontent.com/images/${id}.${ext}?width=1200`;

export const FALLBACK_SERVICES = [
  {
    id: 1,
    title: "Sofas & Seating",
    tagline: "Comfort, shaped beautifully",
    description:
      "Soft textures, supportive forms, and timeless silhouettes designed for everyday lounging.",
    image: I("BoDSH0ooQXlngYN7PhPBrCLvcXY"),
    subunits: [
      {
        id: 11,
        title: "Sofas",
        description: "Deep, relaxed sofas in natural fabrics.",
        image: I("6Gq2kYWF3hcmsz518kOQp0IHBJ0"),
      },
      {
        id: 12,
        title: "Armchairs",
        description: "Compact seats with character.",
        image: I("6mdcuJUTe3Ci7BAz6ICRp4w7As"),
      },
    ],
  },
  {
    id: 2,
    title: "Beds & Bedroom",
    tagline: "Rest starts here",
    description:
      "Calm proportions and tactile materials create a bedroom that feels warm, quiet, and effortless.",
    image: I("oVf8mP1IQbYQqBAL3mfw74IK8W8"),
    subunits: [
      {
        id: 21,
        title: "Beds",
        description: "Solid frames, soft edges.",
        image: I("EmVV2mTTIcbv966AUddL3KbXsU"),
      },
      {
        id: 22,
        title: "Nightstands",
        description: "Small pieces that do a lot.",
        image: I("zsqTl9RQLGxILUbbjin6ieFOik"),
      },
    ],
  },
  {
    id: 3,
    title: "Dining Tables",
    tagline: "Made for gathering",
    description:
      "Solid, balanced designs built around shared meals, conversations, and long evenings together.",
    image: I("EkvtYRcD9udxuTIm29M57jFOQ"),
    subunits: [
      {
        id: 31,
        title: "Tables",
        description: "Oak and walnut, built to last.",
        image: I("3g2l4JtmJIyIp0GNimCKPCLMmQ"),
      },
      {
        id: 32,
        title: "Dining chairs",
        description: "Quiet comfort for long dinners.",
        image: I("zsdiBiNZUhWRwSnz0Paqs5sW4so"),
      },
    ],
  },
  {
    id: 4,
    title: "Accent Chairs",
    tagline: "A statement worth sitting in",
    description:
      "Sculptural forms and distinctive details that bring character to bedrooms, corners, and living spaces.",
    image: I("iTE87J6sw6vDr3Lnah80hzEMo"),
    subunits: [
      {
        id: 41,
        title: "Sculptural chairs",
        description: "Pieces that anchor a room.",
        image: I("77cdpMWrN6AesE4ubfNLsQjHQjI"),
      },
    ],
  },
  {
    id: 5,
    title: "Lounge Chairs",
    tagline: "Your favorite place to pause",
    description:
      "Comfortable, sculptural chairs designed for reading, relaxing, or simply doing nothing.",
    image: I("7SyaX8AGEcyY2AkQzamzUtIqHR4", "webp"),
    subunits: [
      {
        id: 51,
        title: "Reading chairs",
        description: "Made for a good book.",
        image: I("yg6ZNa5fJJpILrrswZkS0zylZE"),
      },
    ],
  },
];
