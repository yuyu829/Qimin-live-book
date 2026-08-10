"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import "./login.css";

export default function LoginPage() {
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const account = String(form.get("account") ?? "").trim();
    const password = String(form.get("password") ?? "").trim();

    if (!account || !password) {
      setError("请填写账号和密码");
      return;
    }
    window.location.href = "/";
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-mark" aria-hidden="true">古</div>
        <p className="login-overline">欢迎回来</p>
        <h1>齐民要术</h1>
        <p className="login-subtitle">登录后，继续你的古书探索之旅</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label><span>账号</span><input name="account" type="text" placeholder="手机号或用户名" autoComplete="username" /></label>
          <label><span>密码</span><input name="password" type="password" placeholder="请输入密码" autoComplete="current-password" /></label>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button type="submit">登录并进入</button>
        </form>
        <Link href="/" className="login-guest">暂不登录，直接体验</Link>
      </section>
    </main>
  );
}
