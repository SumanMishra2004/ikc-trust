import type { MetadataRoute } from "next";

const BASE_URL = "https://www.ikc.org.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core
    { url: BASE_URL,                               lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0  },
    { url: `${BASE_URL}/about`,                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.9  },
    { url: `${BASE_URL}/contact`,                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8  },
    { url: `${BASE_URL}/team`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7  },
    { url: `${BASE_URL}/advisory-board`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7  },

    // Initiatives
    { url: `${BASE_URL}/initiatives/education`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE_URL}/initiatives/healthcare`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE_URL}/initiatives/environment`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE_URL}/initiatives/social-welfare`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE_URL}/initiatives/disaster-relief`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE_URL}/initiatives/culture-sports`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE_URL}/initiatives/conference`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.85 },

    // Network
    { url: `${BASE_URL}/partnerships`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.7  },
    { url: `${BASE_URL}/collaborators`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.7  },
    { url: `${BASE_URL}/contributors`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.7  },
    { url: `${BASE_URL}/awards-recognition`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.6  },
  ];
}
