'use client';

import { useRouter } from 'next/navigation';

export default function FormLogin() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/login');
    const data = await res.json();

    if (data.isAuthenticated === true) {
      const url = new URL(window.location.href);
      router.push(url.searchParams.get('returnTo') ?? '/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className="w-full appearance-none bg-transparent" placeholder="Name" type="text" />
      <input className="w-full appearance-none bg-transparent" placeholder="Password" type="password" />
      <button className="text-[rgb(0,87,255)] hover:text-[blue]" type="submit">
        Submit
      </button>
    </form>
  );
}