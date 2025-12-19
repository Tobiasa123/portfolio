"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/Button";

interface User {
  uid: string;
  email: string;
  role: string;
  status: "active" | "suspended"; 
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

  const handleAction = async (action: "promote" | "demote" | "suspend" | "unsuspend") => {
    setLoading(true);
    setError(null);
    try {
      let endpoint = `/api/admin/users/${action}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");

      // Update local state
      let updatedUser: User = { ...user };

      switch (action) {
        case "promote":
          updatedUser.role = "admin";
          break;
        case "demote":
          updatedUser.role = "user";
          break;
        case "suspend":
          updatedUser.status = "suspended";
          break;
        case "unsuspend":
          updatedUser.status = "active";
          break;
      }

      onUpdate?.(updatedUser);
      alert(`${action.charAt(0).toUpperCase() + action.slice(1)}d ${user.email}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="p-3 border rounded flex flex-col gap-2">
      <div>
        <strong>{user.email}</strong> ({user.role}) — <em>{user.status}</em>
      </div>
      <div>UID: {user.uid}</div>
      <div>Created: {user.createdAt}</div>
      <div className="flex gap-2 mt-2 flex-wrap">
        <Button
          text="Promote"
          onClick={() => handleAction("promote")}
          disabled={loading || user.role === "admin"}
        />
        <Button
          text="Demote"
          onClick={() => handleAction("demote")}
          disabled={loading || user.role === "user"}
        />
        {user.status === "active" ? (
          <Button
            text="Suspend"
            onClick={() => handleAction("suspend")}
            disabled={loading}
          />
        ) : (
          <Button
            text="Unsuspend"
            onClick={() => handleAction("unsuspend")}
            disabled={loading}
          />
        )}
      </div>
      {error && <div className="text-red-500 mt-1">{error}</div>}
    </li>
  );
}
