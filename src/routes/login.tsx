import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login")({ head: () => seo("Login or Sign Up", "Sign in to IndexBaazaar to save watchlists, portfolios and research."), component: Login });

function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const input = "w-full rounded-lg border border-input bg-secondary px-3 py-2.5 text-sm";
  return (
    <div className="mx-auto max-w-md px-5 py-14">
      <div className="glass rounded-2xl p-6">
        <div className="mb-6 grid grid-cols-2 rounded-full bg-muted p-1 text-sm">{(["login", "signup"] as const).map((m) => <button key={m} onClick={() => setMode(m)} className={"rounded-full py-2 " + (mode === m ? "bg-primary text-primary-foreground" : "")}>{m === "login" ? "Login" : "Sign Up"}</button>)}</div>
        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); toast.info("Accounts are coming soon — sign-in hasn't been switched on yet."); }}>
          {mode === "signup" && <input className={input} placeholder="Full name" />}
          <input className={input} type="email" placeholder="Email" />
          <input className={input} type="password" placeholder="Password" />
          <button className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground">{mode === "login" ? "Login" : "Create account"}</button>
        </form>
        <p className="mt-4 text-center text-xs text-muted-foreground">Account sign-in is being prepared. Until then your watchlist and portfolio are saved on this device.</p>
      </div>
    </div>
  );
}
