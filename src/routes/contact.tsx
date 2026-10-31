import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({ head: () => seo("Contact Us", "Get in touch with the IndexBaazaar research team."), component: Contact });

function Contact() {
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const input = "w-full rounded-lg border border-input bg-secondary px-3 py-2.5 text-sm";
  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <h1 className="text-3xl font-bold md:text-5xl">Contact Us</h1>
      <p className="mt-3 text-muted-foreground">Questions about our research or membership? Send us a message.</p>
      {sent ? (
        <div className="glass mt-8 rounded-2xl p-8 text-center"><p className="text-lg font-semibold text-primary">Thank you, {f.name}!</p><p className="mt-2 text-sm text-muted-foreground">Your message has been noted. Message delivery to the team will be connected soon.</p></div>
      ) : (
        <form className="glass mt-8 space-y-4 rounded-2xl p-6" onSubmit={(e) => {
          e.preventDefault();
          if (f.name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(f.email) || f.message.trim().length < 10) return toast.error("Please enter your name, a valid email and a message of at least 10 characters.");
          setSent(true);
        }}>
          <input className={input} placeholder="Full name" maxLength={100} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <input className={input} placeholder="Email" type="email" maxLength={255} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          <input className={input} placeholder="Subject" maxLength={150} value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} />
          <textarea className={input + " min-h-32"} placeholder="Message" maxLength={2000} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
          <button className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground">Send message</button>
        </form>
      )}
    </div>
  );
}
