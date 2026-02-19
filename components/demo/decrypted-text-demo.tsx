"use client";

import { useTranslations } from "next-intl";
import DecryptedText from "@/components/text/decrypted-text";

export function DecryptedTextDemo() {
  const t = useTranslations("DecryptedTextDemo");

  return (
    <div className="flex flex-col justify-center items-center gap-12 py-12 w-full max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {t("labels.hoverDefault")}
        </p>
        <DecryptedText
          text={t("text.hover")}
          className="text-2xl font-bold text-primary"
          encryptedClassName="text-2xl font-bold text-muted-foreground"
        />
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {t("labels.sequentialStart")}
        </p>
        <DecryptedText
          text={t("text.sequentialStart")}
          sequential
          revealDirection="start"
          className="text-2xl font-bold text-primary"
          encryptedClassName="text-2xl font-bold text-muted-foreground"
        />
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {t("labels.sequentialEnd")}
        </p>
        <DecryptedText
          text={t("text.sequentialEnd")}
          sequential
          revealDirection="end"
          className="text-2xl font-bold text-primary"
          encryptedClassName="text-2xl font-bold text-muted-foreground"
        />
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {t("labels.sequentialCenter")}
        </p>
        <DecryptedText
          text={t("text.sequentialCenter")}
          sequential
          revealDirection="center"
          className="text-2xl font-bold text-primary"
          encryptedClassName="text-2xl font-bold text-muted-foreground"
        />
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {t("labels.scrambleOnly")}
        </p>
        <DecryptedText
          text={t("text.scramble")}
          sequential={false}
          maxIterations={12}
          speed={60}
          className="text-2xl font-bold text-primary"
          encryptedClassName="text-2xl font-bold text-muted-foreground"
        />
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {t("labels.revealOnView")}
        </p>
        <DecryptedText
          text={t("text.view")}
          animateOn="view"
          sequential
          className="text-2xl font-bold text-primary"
          encryptedClassName="text-2xl font-bold text-muted-foreground"
        />
      </div>
    </div>
  );
}

export const decryptedTextSource = `import DecryptedText from "@/components/text/decrypted-text";

<DecryptedText
  text="Decrypted on hover"
  className="text-2xl font-bold"
  encryptedClassName="text-2xl font-bold text-muted-foreground"
/>

<DecryptedText
  text="Revealed one by one"
  sequential
  revealDirection="start"
  className="text-2xl font-bold"
/>

<DecryptedText
  text="Scramble then reveal"
  sequential={false}
  maxIterations={12}
  speed={60}
  className="text-2xl font-bold"
/>

<DecryptedText
  text="Animate on scroll into view"
  animateOn="view"
  sequential
  className="text-2xl font-bold"
/>`;
