"use client";

import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { Card } from "@/components/core/Card";
import { Input } from "@/components/forms/Input";
import { FileDropzone } from "@/components/forms/FileDropzone";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { ScrollReveal } from "@/components/core/ScrollReveal";
import {
  SITE_EMAIL,
  SITE_OFFICE_ADDRESS,
  SITE_OFFICE_HOURS,
  SITE_OFFICE_MAP_EMBED_URL,
  SITE_OFFICE_METRO,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_TELEGRAM_HANDLE,
  SITE_TELEGRAM_URL,
  SITE_WHATSAPP_DISPLAY,
  SITE_WHATSAPP_URL,
} from "@/data/site";

const CONTACT_METHODS = [
  { icon: "mail", label: "Email", value: SITE_EMAIL, href: `mailto:${SITE_EMAIL}` },
  { icon: "phone", label: "Телефон", value: SITE_PHONE_DISPLAY, href: `tel:${SITE_PHONE_TEL}` },
  { icon: "send", label: "Telegram", value: SITE_TELEGRAM_HANDLE, href: SITE_TELEGRAM_URL },
  { icon: "message-circle", label: "WhatsApp", value: SITE_WHATSAPP_DISPLAY, href: SITE_WHATSAPP_URL },
];

export function ContactsBody() {
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      if (file) formData.append("file", file);
      const res = await fetch("/api/leads", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Не удалось отправить заявку");
        return;
      }
      setSent(true);
    } catch {
      setError("Нет соединения с сервером. Попробуйте ещё раз, либо напишите нам напрямую.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Контакты
          </span>
        }
        title="Контакты"
        subtitle="Ответим в течение рабочего дня. Не готовы оставлять заявку — переведите бесплатный фрагмент прямо сейчас, без регистрации."
        ctaHref="/perevodchik"
        ctaLabel="Перевести бесплатно"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <div className="tp-contact-grid">
            {CONTACT_METHODS.map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 70}>
                <a href={m.href} target={m.href.startsWith("http") ? "_blank" : undefined} rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined} style={{ textDecoration: "none", display: "block" }}>
                  <Card padding="lg" className="tp-contact-card">
                    <div className="tp-contact-card__icon">
                      <Icon name={m.icon} size={22} />
                    </div>
                    <div>
                      <div className="tp-contact-card__label">{m.label}</div>
                      <div className="tp-contact-card__value">{m.value}</div>
                    </div>
                  </Card>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader title="Наш офис" />
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <div className="tp-office">
              <Card padding="lg" className="tp-office__info">
                <div className="tp-contact-card__icon">
                  <Icon name="map-pin" size={22} />
                </div>
                <div className="tp-office__address">{SITE_OFFICE_ADDRESS}</div>
                <div className="tp-office__row">
                  <span className="tp-office__row-label">Метро:</span>
                  <span>{SITE_OFFICE_METRO}</span>
                </div>
                <div className="tp-office__row">
                  <Icon name="calendar" size={16} />
                  <span>{SITE_OFFICE_HOURS}</span>
                </div>
                <div className="tp-office__row">
                  <Icon name="phone" size={16} />
                  <a href={`tel:${SITE_PHONE_TEL}`}>{SITE_PHONE_DISPLAY}</a>
                </div>
              </Card>
              <div className="tp-office__map">
                <iframe
                  src={SITE_OFFICE_MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  frameBorder={0}
                  loading="lazy"
                  title="Офис Техперевод.com на карте"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="tp-section">
        <div className="tp-section__inner">
          <ScrollReveal>
            <SectionHeader
              title="Оставить заявку"
              subtitle="Заполните форму — мы свяжемся с вами и пришлём оценку стоимости."
            />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            {sent ? (
              <Card variant="elevated" padding="lg" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
                <Icon name="shield-check" color="var(--tp-accent)" size={32} />
                <p style={{ marginTop: 16, color: "var(--tp-text)" }}>
                  Заявка отправлена. Мы ответим в течение рабочего дня.
                </p>
              </Card>
            ) : (
              <form className="tp-contact-form" onSubmit={submit}>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
                <div className="tp-contact-form__row">
                  <Input name="name" label="Имя" placeholder="Иван Иванов" required />
                  <Input name="email" label="Email" type="email" placeholder="you@company.ru" required />
                </div>
                <div className="tp-contact-form__row">
                  <Input name="company" label="Компания" placeholder="ООО «Ромашка»" />
                  <Input name="langPair" label="Языковая пара" mono placeholder="RU→EN" />
                </div>
                <Input name="comment" label="Комментарий" placeholder="Кратко опишите задачу" />
                <FileDropzone
                  hint="DOCX, PDF, XLSX, PPTX, TXT — необязательно, посчитаем оценку сразу"
                  state={file ? "done" : "idle"}
                  fileName={file?.name}
                  onFiles={(files) => setFile(files[0])}
                />
                {error ? <div className="tp-translator__error">{error}</div> : null}
                <Button type="submit" size="lg" variant="primary" fullWidth disabled={submitting}>
                  {submitting ? "Отправляем…" : "Отправить заявку"}
                </Button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
