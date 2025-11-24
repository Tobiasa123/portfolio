// page.tsx
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const session = cookieStore.get("__session")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users`, {
    headers: {
      cookie: `__session=${session}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!Array.isArray(data)) {
    return <div>Error: {data.error || "Failed to load users"}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <ul className="space-y-2">
        {data.map((u: any) => (
          <li key={u.uid} className="p-3 border rounded">
            <strong>{u.email}</strong>
            <div>UID: {u.uid}</div>
            <div>Created: {u.createdAt}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
