"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/Button";

interface User {
  uid: string;
  email: string;
  createdAt: string;
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users", { credentials: "include" });
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
          <UserItem key={u.uid} user={u} />
        ))}
      </ul>
    </div>
  );
}

function UserItem({ user }: { user: User }) {
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
      alert(`${action === "promote" ? "Promoted" : "Demoted"} ${user.email}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="p-3 border rounded flex flex-col gap-2">
      <div><strong>{user.email}</strong></div>
      <div>UID: {user.uid}</div>
      <div>Created: {user.createdAt}</div>
      <div className="flex gap-2 mt-2">
        <Button text="Promote" onClick={() => handleAction("promote")} disabled={loading} />
        <Button text="Demote" onClick={() => handleAction("demote")} disabled={loading} />
      </div>
      {error && <div className="text-red-500 mt-1">{error}</div>}
    </li>
  );
}
