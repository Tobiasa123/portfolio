"use client";

//src/app/dashboard/admin/users/UsersClient.tsx

import { useState, useEffect } from "react";
import { Button } from "@/components/Button";

interface User {
  uid: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UsersClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users", { credentials: "include" });
        if (res.status === 401 || res.status === 403) {
          window.location.href = "/404";
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch users");
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <ul className="space-y-2">
        {users.map((u) => (
          <UserItem
            key={u.uid}
            user={u}
            onUpdate={(updated) =>
              setUsers(prev => prev.map(p => p.uid === updated.uid ? updated : p))
            }
          />
        ))}
      </ul>
    </div>
  );
}

function UserItem({
  user,
  onUpdate,
}: {
  user: User;
  onUpdate?: (u: User) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (action: "promote" | "demote") => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");

      const updatedUser: User = data.user ?? { ...user, role: action === "promote" ? "admin" : "user" };
      onUpdate?.(updatedUser);
      alert(`${action === "promote" ? "Promoted" : "Demoted"} ${user.email}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="p-3 border rounded flex flex-col gap-2">
      <div><strong>{user.email}</strong> ({user.role})</div>
      <div>UID: {user.uid}</div>
      <div>Created: {user.createdAt}</div>
      <div className="flex gap-2 mt-2">
        <Button text="Promote" onClick={() => handleAction("promote")} disabled={loading || user.role === "admin"} />
        <Button text="Demote" onClick={() => handleAction("demote")} disabled={loading || user.role === "user"} />
      </div>
      {error && <div className="text-red-500 mt-1">{error}</div>}
    </li>
  );
}
