// Loyihaning o'ziga xos ikonka to'plami.
// MUHIM: standart ikon kutubxonalar (lucide, heroicons va h.k.) ishlatilmaydi
// — ular ko'pchilik AI-chat interfeyslarida (Claude, ChatGPT) uchraydigan bir
// xil ingichka chiziqli uslubga ega. Shu sababli har bir ikonka shu yerda
// qo'lda, ikki tonli (duotone) va "currentColor" ga moslashuvchan qilib
// chizilgan — rangli plitkalar ustida ishlatilganda yaxshi ko'rinadi.

import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Brend belgisi — porlash/g'oya yulduzchasi (logotip va bosh sahifa uchun). */
export function IconSpark(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 2.5c.5 3.2 1.1 5.3 2.3 6.6 1.3 1.3 3.4 1.9 6.6 2.4-3.2.5-5.3 1.1-6.6 2.4-1.2 1.3-1.8 3.4-2.3 6.6-.5-3.2-1.1-5.3-2.3-6.6-1.3-1.3-3.4-1.9-6.6-2.4 3.2-.5 5.3-1.1 6.6-2.4 1.2-1.3 1.8-3.4 2.3-6.6Z"
        fill="currentColor"
      />
      <circle cx="19.5" cy="4.5" r="1.6" fill="currentColor" opacity=".55" />
    </svg>
  );
}

/** Naqsh / Matritsa toifasi — 2x2 rangli katakcha to'r. */
export function IconPattern(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="8" height="8" rx="2.2" fill="currentColor" />
      <rect x="13" y="3" width="8" height="8" rx="2.2" fill="currentColor" opacity=".5" />
      <rect x="3" y="13" width="8" height="8" rx="2.2" fill="currentColor" opacity=".5" />
      <rect x="13" y="13" width="8" height="8" rx="2.2" fill="currentColor" />
    </svg>
  );
}

/** Arifmetik toifa — son o'qi ustidagi abakus donalari. */
export function IconMath(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="2.4" rx="1.2" fill="currentColor" opacity=".45" />
      <rect x="3" y="16.6" width="18" height="2.4" rx="1.2" fill="currentColor" opacity=".45" />
      <circle cx="8" cy="6.2" r="2.6" fill="currentColor" />
      <circle cx="16" cy="17.8" r="2.6" fill="currentColor" />
    </svg>
  );
}

/** Mantiqiy ketma-ketlik — zanjir (bog'liq halqalar). */
export function IconLogical(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="2.5"
        y="8.5"
        width="11"
        height="7"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="2.2"
        opacity=".55"
      />
      <rect
        x="10.5"
        y="8.5"
        width="11"
        height="7"
        rx="3.5"
        fill="currentColor"
      />
    </svg>
  );
}

/** Og'zaki analogiya — nuqtali suhbat pufakchasi. */
export function IconVerbal(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 4v-4H4A1.5 1.5 0 0 1 2.5 15V7A1.5 1.5 0 0 1 4 5.5Z"
        fill="currentColor"
      />
      <circle cx="8" cy="10.8" r="1.15" fill="var(--background)" />
      <circle cx="12" cy="10.8" r="1.15" fill="var(--background)" />
      <circle cx="16" cy="10.8" r="1.15" fill="var(--background)" />
    </svg>
  );
}

/** Vaqt (taymer) — soat ko'rsatkichlari bilan. */
export function IconClock(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12.5" r="8.5" stroke="currentColor" strokeWidth="2" opacity=".5" />
      <path
        d="M12 7.5v5.3l3.6 2.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 2.5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** To'g'ri javob belgisi. */
export function IconCheck(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 12.5l5 5L20 6.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Xato javob belgisi. */
export function IconCross(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5.5 5.5l13 13M18.5 5.5l-13 13"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** O'ngga o'q — CTA tugmalar uchun. */
export function IconArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 12h15.5M14 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Telefon — aloqa/kontakt uchun. */
export function IconPhone(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5.3 3.3h3.1l1.6 4.1-2.1 1.6a11.3 11.3 0 0 0 5.6 5.6l1.6-2.1 4.1 1.6v3.1a1.6 1.6 0 0 1-1.7 1.6C10.6 18.3 5.7 13.4 3.7 6.5a1.6 1.6 0 0 1 1.6-1.7Z"
        fill="currentColor"
      />
      <circle cx="18.5" cy="5.5" r="2.3" fill="currentColor" opacity=".45" />
    </svg>
  );
}

/** Maxfiylik / himoya — qalqon belgisi. */
export function IconShield(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 2.3 20 5.2v6.1c0 5.1-3.4 8.4-8 10.1-4.6-1.7-8-5-8-10.1V5.2l8-2.9Z"
        fill="currentColor"
        opacity=".5"
      />
      <path
        d="M8.3 12.1l2.5 2.5 4.9-5.2"
        stroke="var(--background)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Natija sahifasi uchun medal/yutuq belgisi. */
export function IconMedal(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M8.5 3h7l-2.3 6.2-2.2-6.2Z"
        fill="currentColor"
        opacity=".5"
      />
      <circle cx="12" cy="14.5" r="6.5" fill="currentColor" />
      <path d="M9.3 14.7l1.8 1.8 3.6-3.9" stroke="var(--background)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
