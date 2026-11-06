const defaultCategories = [
  {
    id: 1,
    title: "Modular Kitchen",
    slug: "modular-kitchen",
    description:
      "Discover stylish modular kitchen designs for every space and lifestyle.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=90",
    sortOrder: 1,
    isActive: true,

    designs: [
      {
        id: 1,
        title: "L-Shaped Kitchen",
        slug: "l-shaped-kitchen",
        style: "Contemporary",
        location: "CHENNAI",
        description:
          "A beautiful L-shaped modular kitchen designed to make the best use of corner spaces. Warm wooden finishes, elegant lighting and practical storage combine to create a functional cooking experience.",
        coverImage:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=85",
        images: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=85",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=85",
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000&q=85",
        ],
        features: [
          "Space-efficient L-shaped layout",
          "Premium modular cabinets",
          "Soft-close drawers",
          "Smart corner storage",
          "Warm ambient lighting",
        ],
        suitableFor: ["2 BHK", "3 BHK", "Compact apartments"],
      },
      {
        id: 2,
        title: "U-Shaped Kitchen",
        slug: "u-shaped-kitchen",
        style: "Modern Minimal",
        location: "CHENNAI",
        description:
          "A U-shaped kitchen that provides generous counter space and organised storage. Its carefully planned layout makes cooking, cleaning and preparation convenient.",
        coverImage:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=85",
        images: [
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=85",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=85",
          "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1000&q=85",
        ],
        features: [
          "Three-sided worktop layout",
          "Maximum cabinet storage",
          "Dedicated appliance spaces",
          "Easy cooking workflow",
          "Premium countertop finish",
        ],
        suitableFor: ["3 BHK", "4 BHK", "Large kitchens"],
      },
      {
        id: 3,
        title: "Island Kitchen",
        slug: "island-kitchen",
        style: "Luxury Contemporary",
        location: "CHENNAI",
        description:
          "An elegant island kitchen that creates a natural centre for cooking and socialising. It combines beautiful finishes with generous preparation and dining space.",
        coverImage:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=85",
        images: [
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=85",
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=85",
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000&q=85",
        ],
        features: [
          "Central kitchen island",
          "Integrated storage",
          "Pendant lighting",
          "Premium wood finishes",
          "Open social cooking space",
        ],
        suitableFor: ["4 BHK", "Villas", "Open-plan homes"],
      },
      {
        id: 4,
        title: "Straight Kitchen",
        slug: "straight-kitchen",
        style: "Modern",
        location: "CHENNAI",
        description:
          "A streamlined single-wall kitchen designed for compact homes. Every cabinet and appliance is carefully arranged to provide a clean and practical cooking space.",
        coverImage:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=85",
        images: [
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=85",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=85",
          "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1000&q=85",
        ],
        features: [
          "Single-wall layout",
          "Space-saving storage",
          "Clean cabinet arrangement",
          "Integrated appliances",
          "Easy maintenance",
        ],
        suitableFor: ["Studio apartments", "1 BHK", "2 BHK"],
      },
      {
        id: 5,
        title: "Parallel Kitchen",
        slug: "parallel-kitchen",
        style: "Contemporary",
        location: "CHENNAI",
        description:
          "A parallel kitchen with two facing counters for a highly organised workflow. Separate preparation and cooking areas provide excellent usability.",
        coverImage:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=85",
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=85",
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000&q=85",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=85",
        ],
        features: [
          "Two-counter layout",
          "Dedicated preparation zones",
          "Ample overhead storage",
          "Efficient movement",
          "Contemporary finishes",
        ],
        suitableFor: ["2 BHK", "3 BHK", "Narrow kitchen spaces"],
      },
    ],

    faqs: [
      {
        id: 1,
        question: "Which modular kitchen layout is best for my home?",
        answer:
          "The best layout depends on your room size, available space, workflow and storage requirements. L-shaped, U-shaped, parallel and straight layouts are common options.",
        sortOrder: 1,
      },
      {
        id: 2,
        question: "Can I customise the cabinet colours and finishes?",
        answer:
          "Yes. You can choose from different laminates, acrylic finishes, shutters, countertop materials and hardware options.",
        sortOrder: 2,
      },
      {
        id: 3,
        question: "How long does a modular kitchen take to complete?",
        answer:
          "The timeline depends on the design, materials, site conditions and installation requirements. Our team will provide an estimated schedule after reviewing your project.",
        sortOrder: 3,
      },
      {
        id: 4,
        question: "Do you provide kitchen storage solutions?",
        answer:
          "Yes. We plan drawers, corner units, tall units, pantry storage and other accessories based on your kitchen requirements.",
        sortOrder: 4,
      },
    ],
  },

  {
    id: 2,
    title: "Foyer",
    slug: "foyer",
    description:
      "Create a beautiful first impression with thoughtfully designed entrances.",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1800&q=90",
    sortOrder: 2,
    isActive: true,

    designs: [
      {
        id: 6,
        title: "Modern Foyer",
        slug: "modern-foyer",
        style: "Modern Luxury",
        location: "CHENNAI",
        description:
          "A thoughtfully designed foyer featuring a stylish console, statement mirror and practical storage for everyday essentials.",
        coverImage:
          "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1000&q=85",
        images: [
          "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1000&q=85",
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=85",
        ],
        features: [
          "Decorative wall panelling",
          "Floating console",
          "Ambient lighting",
          "Hidden shoe storage",
        ],
        suitableFor: ["Apartments", "Villas"],
      },
    ],

    faqs: [
      {
        id: 5,
        question: "What can be included in a foyer design?",
        answer:
          "A foyer can include a console, mirror, shoe storage, wall panelling, decorative lighting and seating.",
        sortOrder: 1,
      },
      {
        id: 6,
        question: "Can a small entrance have a stylish design?",
        answer:
          "Absolutely. Compact storage, mirrors and carefully selected lighting can make a small entrance feel spacious and welcoming.",
        sortOrder: 2,
      },
    ],
  },

  {
    id: 3,
    title: "Living Room",
    slug: "living-room",
    description:
      "Explore elegant living spaces designed for comfort and connection.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1800&q=90",
    sortOrder: 3,
    isActive: true,

    designs: [
      {
        id: 7,
        title: "Contemporary Living Room",
        slug: "contemporary-living-room",
        style: "Contemporary",
        location: "CHENNAI",
        description:
          "A welcoming living room with comfortable seating, balanced lighting and elegant finishes.",
        coverImage:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=85",
        images: [
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=85",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=85",
        ],
        features: [
          "Custom TV unit",
          "Layered lighting",
          "Comfortable seating",
          "Decorative wall finishes",
        ],
        suitableFor: ["2 BHK", "3 BHK", "Villas"],
      },
    ],

    faqs: [
      {
        id: 7,
        question: "Can you design a custom TV unit?",
        answer:
          "Yes. TV units can be customised with storage, display shelves, wall finishes and integrated lighting.",
        sortOrder: 1,
      },
      {
        id: 8,
        question: "Can you work with my existing furniture?",
        answer:
          "Yes. We can plan the new layout and finishes around furniture you intend to retain.",
        sortOrder: 2,
      },
    ],
  },

  {
    id: 4,
    title: "Bedroom",
    slug: "bedroom",
    description:
      "Find your perfect balance of comfort, warmth and personal style.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=90",
    sortOrder: 4,
    isActive: true,

    designs: [
      {
        id: 8,
        title: "Luxury Master Bedroom",
        slug: "luxury-master-bedroom",
        style: "Luxury",
        location: "CHENNAI",
        description:
          "A calming master bedroom designed with warm textures, custom wardrobes and a beautiful upholstered headboard.",
        coverImage:
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&q=85",
        images: [
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&q=85",
          "https://images.unsplash.com/photo-1617104678098-de229db51175?w=1000&q=85",
        ],
        features: [
          "Custom headboard",
          "Wardrobe storage",
          "Bedside lighting",
          "Warm colour palette",
        ],
        suitableFor: ["3 BHK", "4 BHK", "Villas"],
      },
    ],

    faqs: [
      {
        id: 9,
        question: "Can bedroom wardrobes be customised?",
        answer:
          "Yes. Wardrobes can be designed based on available wall space, storage needs, finishes and door preferences.",
        sortOrder: 1,
      },
      {
        id: 10,
        question: "Can you design a complete master bedroom?",
        answer:
          "Yes. We can coordinate the bed back panel, wardrobes, lighting, side tables and other bedroom elements.",
        sortOrder: 2,
      },
    ],
  },

  {
    id: 5,
    title: "Kids Bedroom",
    slug: "kids-bedroom",
    description:
      "Creative and comfortable spaces made for growing imaginations.",
    image:
      "https://images.unsplash.com/photo-1617104678098-de229db51175?w=1800&q=90",
    sortOrder: 5,
    isActive: true,

    designs: [
      {
        id: 9,
        title: "Playful Kids Bedroom",
        slug: "playful-kids-bedroom",
        style: "Playful Modern",
        location: "CHENNAI",
        description:
          "A colourful yet organised kids bedroom with functional study space, clever storage and comfortable sleeping arrangements.",
        coverImage:
          "https://images.unsplash.com/photo-1617104678098-de229db51175?w=1000&q=85",
        images: [
          "https://images.unsplash.com/photo-1617104678098-de229db51175?w=1000&q=85",
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&q=85",
        ],
        features: [
          "Study desk",
          "Creative storage",
          "Safe rounded furniture",
          "Flexible play space",
        ],
        suitableFor: ["Kids rooms", "Shared bedrooms"],
      },
    ],

    faqs: [
      {
        id: 11,
        question: "Can the kids room grow with my child?",
        answer:
          "Yes. We can plan flexible furniture and storage that can adapt as your child's needs change.",
        sortOrder: 1,
      },
      {
        id: 12,
        question: "Do you include study and play areas?",
        answer:
          "Yes. Study desks, bookshelves, toy storage and play areas can be included in the design.",
        sortOrder: 2,
      },
    ],
  },

  {
    id: 6,
    title: "Wardrobe",
    slug: "wardrobe",
    description:
      "Smart storage solutions with beautiful finishes and thoughtful details.",
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1800&q=90",
    sortOrder: 6,
    isActive: true,

    designs: [
      {
        id: 10,
        title: "Walk-in Wardrobe",
        slug: "walk-in-wardrobe",
        style: "Premium Modern",
        location: "CHENNAI",
        description:
          "A sophisticated wardrobe solution with organised compartments, display shelving and integrated lighting.",
        coverImage:
          "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1000&q=85",
        images: [
          "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1000&q=85",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=85",
        ],
        features: [
          "Custom storage compartments",
          "Integrated lighting",
          "Display shelves",
          "Premium finishes",
        ],
        suitableFor: ["Master bedrooms", "Villas", "Luxury apartments"],
      },
    ],

    faqs: [
      {
        id: 13,
        question: "What wardrobe types can I choose?",
        answer:
          "Options include sliding wardrobes, hinged wardrobes, walk-in wardrobes and customised storage units.",
        sortOrder: 1,
      },
      {
        id: 14,
        question: "Can you include internal wardrobe accessories?",
        answer:
          "Yes. Drawers, pull-out trays, shoe racks, hanging sections and other organisers can be planned.",
        sortOrder: 2,
      },
    ],
  },
];

const allCategoryFAQ = [
  {
    id: 15,
    question: "What interior design services do you offer?",
    answer:
      "We offer modular kitchens, living rooms, bedrooms, wardrobes, foyers and complete home interior solutions.",
    sortOrder: 1,
  },
  {
    id: 16,
    question: "Can I customise a design?",
    answer:
      "Yes. Every design can be customised based on your space, preferences, lifestyle and budget.",
    sortOrder: 2,
  },
  {
    id: 17,
    question: "How can I get a design quotation?",
    answer:
      "Select a design you like and use the Get Quote option. Our team can discuss your requirements and provide the next steps.",
    sortOrder: 3,
  },
];

export { defaultCategories, allCategoryFAQ };
