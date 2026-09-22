import { useCallback, useEffect, useState } from "react";
import {
  deleteAdminDocument,
  getCurrentAdmin,
  isAppwriteConfigured,
  listAdminDocuments,
  normalizeFormValue,
  saveAdminDocument,
  seedPortfolio,
  signInAdmin,
  signOutAdmin,
} from "../lib/appwrite";

const SECTIONS = {
  projects: {
    label: "Projects",
    fields: [
      ["name", "Name", "text"], ["role", "Role", "text"], ["problem", "Problem", "textarea"],
      ["description", "Description", "textarea"], ["highlights", "Highlights (comma separated)", "array"],
      ["tech", "Technology (comma separated)", "array"], ["period", "Period", "text"], ["live", "Live URL", "text"],
      ["sortOrder", "Order", "number"], ["published", "Published", "boolean"],
    ],
  },
  experience: {
    label: "Experience",
    fields: [
      ["company", "Company", "text"], ["role", "Role", "text"], ["period", "Period", "text"],
      ["description", "Description", "textarea"], ["tech", "Technology (comma separated)", "array"],
      ["location", "Location", "text"], ["sortOrder", "Order", "number"], ["published", "Published", "boolean"],
    ],
  },
  skills: {
    label: "Skills",
    fields: [
      ["skillsid", "Key", "text"], ["label", "Label", "text"], ["blurb", "Description", "textarea"],
      ["items", "Skills (comma separated)", "array"], ["sortOrder", "Order", "number"], ["published", "Published", "boolean"],
    ],
  },
  websites: {
    label: "Websites",
    fields: [
      ["name", "Name", "text"], ["description", "Description", "textarea"], ["url", "URL", "text"],
      ["sortOrder", "Order", "number"], ["published", "Published", "boolean"],
    ],
  },
  education: {
    label: "Education",
    fields: [
      ["institution", "Institution", "text"], ["period", "Period", "text"], ["description", "Description", "textarea"],
      ["sortOrder", "Order", "number"], ["published", "Published", "boolean"],
    ],
  },
};

const blankForm = (section) => Object.fromEntries(
  SECTIONS[section].fields.map(([key, , type]) => [key, type === "boolean" ? true : ""]),
);

export default function AdminApp() {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);
  const [active, setActive] = useState("projects");
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => { getCurrentAdmin().then(setAdmin).finally(() => setChecking(false)); }, []);
  const refresh = useCallback(async () => {
    try { setRows(await listAdminDocuments(active)); }
    catch (error) { setNotice(error.message); }
  }, [active]);

  useEffect(() => {
    if (admin) refresh();
  }, [admin, refresh]);

  if (checking) return <Centered>Checking admin session…</Centered>;
  if (!isAppwriteConfigured) return <Centered>Set VITE_APPWRITE_PROJECT_ID and VITE_APPWRITE_DATABASE_ID before opening the admin panel.</Centered>;
  if (!admin) return <Login onLogin={setAdmin} />;

  const section = SECTIONS[active];
  const current = editing || blankForm(active);

  async function save(event) {
    event.preventDefault();
    try {
      const data = Object.fromEntries(section.fields.map(([key, , type]) => {
        const value = current[key];
        if (type === "boolean") return [key, Boolean(value)];
        if (type === "number") return [key, Number(value || 0)];
        if (type === "array") return [key, String(value || "").split(",").map((item) => item.trim()).filter(Boolean)];
        return [key, value];
      }));
      await saveAdminDocument(active, data, current.$id);
      setNotice("Saved successfully."); setEditing(null); await refresh();
    } catch (error) { setNotice(error.message); }
  }

  async function remove(row) {
    if (!window.confirm(`Delete ${row.name || row.company || row.institution || "this item"}?`)) return;
    try { await deleteAdminDocument(active, row.$id); setNotice("Deleted."); await refresh(); }
    catch (error) { setNotice(error.message); }
  }

  async function seed() {
    try { await seedPortfolio(); setNotice("Existing portfolio content imported."); await refresh(); }
    catch (error) { setNotice(error.message); }
  }

  return <div className="min-h-screen bg-surface px-4 py-6 text-zinc-100 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-sm text-accent-300">Portfolio CMS</p><h1 className="text-3xl font-bold">Admin panel</h1><p className="mt-1 text-sm text-zinc-500">Signed in as {admin.email}</p></div>
        <div className="flex gap-3"><button className="btn-secondary" onClick={seed}>Import current portfolio</button><button className="btn-secondary" onClick={async () => { await signOutAdmin(); setAdmin(null); }}>Sign out</button></div>
      </header>
      {notice && <div className="mb-5 rounded-lg border border-accent-400/30 bg-accent-400/10 px-4 py-3 text-sm text-accent-200">{notice}</div>}
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="card h-fit p-2">{Object.entries(SECTIONS).map(([key, value]) => <button key={key} onClick={() => { setActive(key); setEditing(null); }} className={`mb-1 w-full rounded-lg px-3 py-2 text-left text-sm ${active === key ? "bg-accent-500 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}>{value.label}</button>)}</nav>
        <main className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <section className="card overflow-hidden"><div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><h2 className="font-semibold">{section.label}</h2><button className="btn-primary" onClick={() => setEditing(blankForm(active))}>Add new</button></div><div className="divide-y divide-white/10">{rows.map((row) => <div className="flex items-center justify-between gap-4 px-5 py-4" key={row.$id}><div className="min-w-0"><p className="truncate font-medium">{row.name || row.company || row.institution || row.label || row.id}</p><p className="truncate text-sm text-zinc-500">{row.role || row.description || row.blurb || ""}</p></div><div className="flex shrink-0 gap-2"><button className="btn-secondary px-3 py-2" onClick={() => setEditing(Object.fromEntries(section.fields.map(([key, , type]) => [key, normalizeFormValue(row[key], type)]).concat([["$id", row.$id]])))}>Edit</button><button className="rounded-lg border border-red-400/30 px-3 py-2 text-sm text-red-300 hover:bg-red-400/10" onClick={() => remove(row)}>Delete</button></div></div>)}{!rows.length && <p className="px-5 py-12 text-center text-sm text-zinc-500">No records yet. Import the current portfolio or add one.</p>}</div></section>
          {editing && <form className="card h-fit space-y-4 p-5" onSubmit={save}><div className="flex items-center justify-between"><h2 className="font-semibold">{editing.$id ? "Edit" : "New"} {section.label.slice(0, -1)}</h2><button type="button" className="text-zinc-500" onClick={() => setEditing(null)}>×</button></div>{section.fields.map(([key, label, type]) => <label key={key} className="block text-sm text-zinc-400">{label}{type === "boolean" ? <input className="ml-3" type="checkbox" checked={Boolean(current[key])} onChange={(e) => setEditing({ ...current, [key]: e.target.checked })} /> : type === "textarea" ? <textarea className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" rows={3} value={current[key] ?? ""} onChange={(e) => setEditing({ ...current, [key]: e.target.value })} /> : <input className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" type={type === "number" ? "number" : "text"} value={current[key] ?? ""} onChange={(e) => setEditing({ ...current, [key]: e.target.value })} />}</label>)}<button className="btn-primary w-full" type="submit">Save changes</button></form>}
        </main>
      </div>
    </div>
  </div>;
}

function Login({ onLogin }) {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState("");
  async function submit(event) { event.preventDefault(); try { onLogin(await signInAdmin(email, password)); } catch (e) { setError(e.message); } }
  return <Centered><form className="card mx-auto w-full max-w-md space-y-5 p-6" onSubmit={submit}><div><p className="text-sm text-accent-300">Portfolio CMS</p><h1 className="mt-1 text-2xl font-bold">Admin sign in</h1></div>{error && <p className="rounded-lg bg-red-400/10 p-3 text-sm text-red-300">{error}</p>}<input className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-white" type="email" required placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} /><input className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-white" type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><button className="btn-primary w-full" type="submit">Sign in</button></form></Centered>;
}

function Centered({ children }) { return <div className="flex min-h-screen items-center justify-center bg-surface px-4 text-zinc-100">{children}</div>; }
