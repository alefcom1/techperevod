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

const CONTACT_METHODS = [
  { icon: "mail", label: "Email", value: "hello@techperevod.com" },
  { icon: "phone", label: "Телефон", value: "+7 495 000-00-00" },
  { icon: "send", label: "Telegram", value: "@techperevod" },
  { icon: "map-pin", label: "Офис", value: "Москва" },
];

export function ContactsBody() {
  const [sent, setSent] = React.useState(false);

  return (
    <>
      <PageHero
        breadcrumb={
          <span>
            <Link href="/">Главная</Link> / Контакты
          </span>
        }
        title="Контакты"
        subtitle="Ответим в течение рабочего дня. Для срочной оценки — прикрепите документ ниже."
        ctaHref="/#hero"
      />

      <section className="tp-section">
        <div className="tp-section__inner">
          <div className="tp-contact-grid">
            {CONTACT_METHODS.map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 70}>
                <Card padding="lg" className="tp-contact-card">
                  <div className="tp-contact-card__icon">
                    <Icon name={m.icon} size={22} />
                  </div>
                  <div>
                    <div className="tp-contact-card__label">{m.label}</div>
                    <div className="tp-contact-card__value">{m.value}</div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section tp-section--tint">
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
              <form
                className="tp-contact-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="tp-contact-form__row">
                  <Input label="Имя" placeholder="Иван Иванов" required />
                  <Input label="Email" type="email" placeholder="you@company.ru" required />
                </div>
                <div className="tp-contact-form__row">
                  <Input label="Компания" placeholder="ООО «Ромашка»" />
                  <Input label="Языковая пара" mono placeholder="RU→EN" />
                </div>
                <Input label="Комментарий" placeholder="Кратко опишите задачу" />
                <FileDropzone hint="DOCX, PDF, XLIFF, JSON — необязательно" />
                <Button type="submit" size="lg" variant="primary" fullWidth>
                  Отправить заявку
                </Button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
