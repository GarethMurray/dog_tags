"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import spikeJpg from "../public/spike.jpeg";
import mileyJpg from "../public/miley.jpeg";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = JSON.stringify({
      text,
      email,
      name,
    });

    setIsDisabled(true);

    try {
      const res = await fetch("/api/mail", { method: "POST", body });
      const json = await res.json();
      if (json?.message === "Success") {
        setEmail("");
        setName("");
        setText("");
        alert("Thanks for contacting me, email sent successfully");
      }
      setIsDisabled(false);
    } catch (e) {
      console.error(e);
      alert("Oh no, this didn't work. Please try again?");
    }
  };

  return (
    <main className="flex min-h-screen flex-col md:flex-row items-start p-4 lg:p-40 container gap-4 mx-auto">
      <div className="flex flex-col items-start gap-4">
        <h1 className="font-bold text-4xl">You&apos;ve found our dog!</h1>
        <p>Thank you so much for taking the time to follow the qr code</p>
        <p>
          Please send me an email using this form, I will get back to you
          urgently!!
        </p>
        <form onSubmit={handleSubmit} className="w-full ">
          <label className="flex flex-col gap-2 lg:w-1/2 mb-4">
            Your name
            <input
              value={name}
              type="text"
              className="form-input rounded"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2 lg:w-1/2 mb-4">
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
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isDisabled}
          >
            Submit
          </button>
        </form>
        <h2 className="text-4xl font-bold mt-6">Thank you!!!</h2>
      </div>
      <div className="flex flex-col gap-4 w-full md:w-1/3">
        <Image
          src={spikeJpg}
          alt="A picture of a dog"
          placeholder="blur"
          className=""
        />
        <Image
          src={mileyJpg}
          alt="A picture of a dog"
          placeholder="blur"
          className=""
        />
      </div>
    </main>
  );
}
