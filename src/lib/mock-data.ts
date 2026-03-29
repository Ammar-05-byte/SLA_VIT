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
    name: "Aarav Menon",
    role: "President",
    bio: "Designs cultural programs around Iberian storytelling.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
  {
    id: "t2",
    name: "Ishita Rao",
    role: "Cultural Lead",
    bio: "Builds immersive events blending music, text, and visual arts.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
];
