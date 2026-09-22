import { Account, Client, TablesDB, ID, Query } from "appwrite";
import { resume } from "../data/resume";

export const COLLECTIONS = {
  profile: import.meta.env.VITE_APPWRITE_PROFILE_COLLECTION_ID || "6ab22fbe00183ffe126e",
  projects: import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID || "6ab230a0001c0c830355",
  skills: import.meta.env.VITE_APPWRITE_SKILLS_COLLECTION_ID || "skills",
  experience: import.meta.env.VITE_APPWRITE_EXPERIENCE_COLLECTION_ID || "experience",
  websites: import.meta.env.VITE_APPWRITE_WEBSITES_COLLECTION_ID || "websites",
  education: import.meta.env.VITE_APPWRITE_EDUCATION_COLLECTION_ID || "education",
  messages: import.meta.env.VITE_APPWRITE_MESSAGES_COLLECTION_ID || "messages",
};

const config = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || "6ab0ecb60002721f95d8",
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || "portfolio",
};

export const isAppwriteConfigured = Boolean(config.projectId);

const client = new Client().setEndpoint(config.endpoint).setProject(config.projectId);
export const account = new Account(client);
export const tablesDB = new TablesDB(client);

const collectionId = (key) => COLLECTIONS[key];

const sortDocuments = (documents) =>
  [...documents].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

const list = async (key, queries = [Query.equal("published", true)]) => {
  if (!isAppwriteConfigured) return [];
  const response = await tablesDB.listRows({
    databaseId: config.databaseId,
    tableId: collectionId(key),
    queries,
  });
  return sortDocuments(response.rows || []);
};

const asArray = (value) => (Array.isArray(value) ? value : value ? [value] : []);

const mapRemoteResume = (documents) => {
  const profile = documents.profile?.[0];
  return {
    ...resume,
    ...(profile || {}),
    projects: documents.projects.length ? documents.projects : resume.projects,
    skills: documents.skills.length ? documents.skills : resume.skills,
    experience: documents.experience.length ? documents.experience : resume.experience,
    websites: documents.websites.length ? documents.websites : resume.websites,
    education: documents.education.length ? documents.education : resume.education,
  };
};

export async function loadPortfolio() {
  if (!isAppwriteConfigured) return resume;
  try {
    const keys = ["profile", "projects", "skills", "experience", "websites", "education"];
    const results = await Promise.all(
      keys.map(async (key) => [key, await list(key)]),
    );
    const remote = mapRemoteResume(Object.fromEntries(results));
    Object.assign(resume, remote);
    return resume;
  } catch (error) {
    console.warn("Appwrite portfolio data unavailable; using local content.", error);
    return resume;
  }
}

export async function submitMessage({ name, email, message }) {
  if (!isAppwriteConfigured) return { stored: false };
  await tablesDB.createRow({
    databaseId: config.databaseId,
    tableId: collectionId("messages"),
    rowId: ID.unique(),
    data: {
      name,
      email,
      message,
      status: "new",
    },
  });
  return { stored: true };
}

export async function getCurrentAdmin() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}

export async function signInAdmin(email, password) {
  await account.createEmailPasswordSession({ email, password });
  return getCurrentAdmin();
}

export async function signOutAdmin() {
  await account.deleteSession({ sessionId: "current" });
}

export async function listAdminDocuments(key) {
  if (!isAppwriteConfigured) throw new Error("Configure Appwrite first.");
  const response = await tablesDB.listRows({
    databaseId: config.databaseId,
    tableId: collectionId(key),
    queries: [Query.orderAsc("sortOrder"), Query.limit(100)],
  });
  return response.rows || [];
}

export async function saveAdminDocument(key, data, documentId) {
  if (!isAppwriteConfigured) throw new Error("Configure Appwrite first.");
  const payload = {
    ...data,
    published: data.published !== false,
    sortOrder: Number(data.sortOrder || 0),
  };
  if (documentId) {
    return tablesDB.updateRow({
      databaseId: config.databaseId,
      tableId: collectionId(key),
      rowId: documentId,
      data: payload,
    });
  }
  return tablesDB.createRow({
    databaseId: config.databaseId,
    tableId: collectionId(key),
    rowId: ID.unique(),
    data: payload,
  });
}

export async function deleteAdminDocument(key, documentId) {
  if (!isAppwriteConfigured) throw new Error("Configure Appwrite first.");
  return tablesDB.deleteRow({
    databaseId: config.databaseId,
    tableId: collectionId(key),
    rowId: documentId,
  });
}

const seedRows = {
  projects: () => resume.projects.map((item, sortOrder) => ({ ...item, sortOrder, published: true })),
  skills: () => resume.skills.map((item, sortOrder) => ({ ...item, sortOrder, published: true })),
  experience: () => resume.experience.map((item, sortOrder) => ({ ...item, sortOrder, published: true })),
  websites: () => resume.websites.map((item, sortOrder) => ({ ...item, sortOrder, published: true })),
  education: () => resume.education.map((item, sortOrder) => ({ ...item, sortOrder, published: true })),
  profile: () => [{
    name: resume.name,
    title: resume.title,
    tagline: resume.tagline,
    location: resume.location,
    availability: resume.availability,
    email: resume.email,
    github: resume.github,
    linkedin: resume.linkedin,
    twitter: resume.twitter,
    portfolio: resume.portfolio,
    stackOverflow: resume.stackOverflow,
    CodeForces: resume.CodeForces,
    LeetCode: resume.LeetCode,
    Phone: resume.Phone,
    summary: resume.summary,
    sortOrder: 0,
    published: true,
  }],
};

export async function seedPortfolio() {
  if (!isAppwriteConfigured) throw new Error("Configure Appwrite first.");
  for (const [key, factory] of Object.entries(seedRows)) {
    const existing = await listAdminDocuments(key);
    if (existing.length) continue;
    for (const row of factory()) await saveAdminDocument(key, row);
  }
  return loadPortfolio();
}

export function normalizeFormValue(value, type) {
  if (type === "array") return Array.isArray(value) ? value.join(", ") : value || "";
  return value ?? "";
}

export function denormalizeFormValue(value, type) {
  if (type === "array") return asArray(String(value).split(",").map((item) => item.trim()).filter(Boolean));
  if (type === "number") return Number(value || 0);
  if (type === "boolean") return Boolean(value);
  return value;
}
