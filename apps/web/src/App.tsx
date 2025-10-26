import React, { useEffect, useState } from "react";

type User = { id: string; name: string; email: string };

export function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("http://localhost:3001/users");
        const data = await res.json();
        setUsers(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div style={{ fontFamily: "Inter, system-ui, Arial", padding: 24 }}>
      <h1>Splitwise-like</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id}>{u.name} — {u.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
