export const mockBlogs = [
  {
    id: "b1",
    title: "Garcia Lorca and the Fire of Spanish Poetry",
    slug: "garcia-lorca-and-the-fire-of-spanish-poetry",
    excerpt: "A quick journey through rhythm, memory, and modern Spanish verse.",
    content:
      "Spanish literature carries intensity and musicality. This article explores how Lorca shaped modern poetic identity.",
    category: "Literature",
    coverImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    publishedAt: new Date().toISOString(),
  },
  {
    id: "b2",
    title: "How Spanish Storytelling Influences Cinema",
    slug: "how-spanish-storytelling-influences-cinema",
    excerpt: "From prose to screen: emotion, silence, and color as narrative tools.",
    content:
      "The association celebrates how literary structures move into film language across generations.",
    category: "Culture",
    coverImage:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    publishedAt: new Date().toISOString(),
  },
];

export const mockEvents = [
  {
    id: "e1",
    title: "Velada Poetica",
    description: "Open mic evening dedicated to contemporary Spanish poetry.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
    startsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: "e2",
    title: "Flamenco and Literature Dialogues",
    description: "Interactive lecture on the link between oral stories and flamenco.",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
    startsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
];

export const mockMaterials = [
  {
    id: "m1",
    title: "Spanish Literature Starter Pack",
    description: "Curated reading list and lecture notes.",
    category: "Reading Lists",
    resourceUrl: "https://example.com/literature-pack",
    kind: "Link",
  },
  {
    id: "m2",
    title: "Grammar Notes A1-A2",
    description: "Printable notes for beginners.",
    category: "Language",
    resourceUrl: "https://example.com/grammar-notes",
    kind: "PDF",
  },
];

export const mockTeam = [
  {
    id: "t1",
    name: "Shrish Singh Sourya",
    role: "Chairperson",
    bio: "Leads the strategic and cultural vision of the association.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "t2",
    name: "Ammar Abdullah",
    role: "Vice Chairperson",
    bio: "Coordinates initiatives and supports chapter-wide execution.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "t3",
    name: "Ramana",
    role: "Secretary",
    bio: "Handles official communication, records, and operations.",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=800&q=80",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "t4",
    name: "Tejas Pisal",
    role: "Co-Secretary",
    bio: "Supports coordination and ensures smooth administrative flow.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "t5",
    name: "R. Naren",
    role: "HR Head",
    bio: "Builds a collaborative member culture and internal support systems.",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "t6",
    name: "S. Mithal Surya",
    role: "Editorial Head",
    bio: "Curates writing, publications, and literary storytelling content.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "t7",
    name: "Samridhi",
    role: "Events Head",
    bio: "Designs and executes immersive events for the chapter.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "t8",
    name: "Jai Kishore",
    role: "Finance Head",
    bio: "Manages budgeting and ensures responsible financial planning.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "t9",
    name: "Senthilpranav",
    role: "Design Head",
    bio: "Shapes the visual language of campaigns and experiences.",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=800&q=80",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "t10",
    name: "Misbah Waseem MI",
    role: "Outreach Head",
    bio: "Builds partnerships and expands the chapter's external network.",
    image:
      "https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?auto=format&fit=crop&w=800&q=80",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
];
