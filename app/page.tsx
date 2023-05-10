"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [name, setName] = useState("1234");
  const [email, setEmail] = useState("arst@gmail.com");
  const [text, setText] = useState("zxcd");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = JSON.stringify({
      text,
      email,
      name,
    });

    try {
      await fetch("/api/mail", { method: "POST", body });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-start p-40 container gap-4 mx-auto">
      <h1 className="text-4xl">You`&apos;`ve found our dog!</h1>
      <p>Thank you so much for taking the time to follow the qr code</p>
      <p>
        Please send me an email using this form, I will get back to you
        urgently!!
      </p>
      <form onSubmit={handleSubmit} className="w-full">
        <label className="flex flex-col gap-2 w-1/2">
          Your name
          <input
            value={name}
            type="text"
            className="form-input rounded"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2 w-1/2">
          Your email
          <input
            value={email}
            type="email"
            className="form-input rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-2 w-full">
          Your message
          <textarea
            value={text}
            className="form-textarea w-full h-40 rounded"
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </main>
  );
}
