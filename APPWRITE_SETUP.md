# Appwrite portfolio CMS

The portfolio keeps the current React/Vite frontend and uses Appwrite for authentication, database records, and contact messages.

## Recommended stack

- **Frontend:** React + Vite (already used by this project)
- **Auth:** Appwrite Account with email/password for one or more admin accounts
- **Database:** Appwrite Databases service (collections/documents). A portfolio is small and content-oriented, so a separate SQL server is unnecessary.
- **Files:** Appwrite Storage for uploaded project images when you are ready to move images out of the repository

## 1. Create the Appwrite resources

In the Appwrite Console, create one database with ID `portfolio` (or set `VITE_APPWRITE_DATABASE_ID` to your ID). Create these collections:

| Collection | Required attributes |
| --- | --- |
| `profile` | `name`, `title`, `tagline`, `location`, `availability`, `email`, `github`, `linkedin`, `twitter`, `portfolio`, `stackOverflow`, `CodeForces`, `LeetCode`, `Phone`, `summary` (string), `published` (boolean), `sortOrder` (integer) |
| `projects` | `name`, `role`, `problem`, `description`, `highlights` (string array), `tech` (string array), `period`, `live`, `images` (string array), `published` (boolean), `sortOrder` (integer) |
| `skills` | `id`, `label`, `blurb`, `items` (string array), `published` (boolean), `sortOrder` (integer) |
| `experience` | `company`, `role`, `period`, `description`, `tech` (string array), `location`, `published` (boolean), `sortOrder` (integer) |
| `websites` | `name`, `description`, `url`, `published` (boolean), `sortOrder` (integer) |
| `education` | `institution`, `period`, `description`, `published` (boolean), `sortOrder` (integer) |
| `messages` | `name`, `email`, `message`, `status` (string) |

Use generous string sizes (for example 2,000 for descriptions and 500 for URLs). Allow arrays to contain at least 20 values.

## 2. Set permissions

For public portfolio collections (`profile`, `projects`, `skills`, `experience`, `websites`, and `education`):

- Read: `Any`
- Create, update, delete: `Users`

For `messages`:

- Create: `Any`
- Read, update, delete: `Users`

Create an Appwrite user for yourself in **Auth → Users**. Only authenticated users can use the admin panel.

## 3. Configure the site

Copy `.env.example` to `.env.local`, set the Appwrite endpoint and project ID, and keep the collection IDs aligned with the console. Add the same variables to the Appwrite Site build environment.

The public site is at `/`. The CMS is at `/admin`.

## 4. Import the current portfolio

1. Deploy the site with the environment variables.
2. Open `/admin` and sign in with the Appwrite admin user.
3. Click **Import current portfolio** once. It creates the initial profile, projects, skills, experience, websites, and education records without overwriting existing records.
4. Edit content from the admin panel.

## Security notes

- Never put an Appwrite API key in Vite client-side variables. The `VITE_*` values are public identifiers only.
- Keep write permissions restricted to authenticated users. If this becomes a team CMS, create a separate admin team and move writes behind a server-side function.
- Use Appwrite Storage for image uploads instead of storing private file URLs in documents.
