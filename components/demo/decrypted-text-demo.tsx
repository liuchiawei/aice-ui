"use client";

import DecryptedText from "@/components/text/decrypted-text";

export function DecryptedTextDemo() {
  return (
    <div className="flex flex-col justify-center items-center gap-12 py-12 w-full max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Hover to reveal (default)</p>
        <DecryptedText
          text="Decrypted on hover"
          className="text-2xl font-bold text-primary"
          encryptedClassName="text-2xl font-bold text-muted-foreground"
        />
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Sequential, start to end</p>
        <DecryptedText
          text="Revealed one by one"
          sequential
          revealDirection="start"
          className="text-2xl font-bold text-primary"
          encryptedClassName="text-2xl font-bold text-muted-foreground"
        />
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Sequential, end to start</p>
        <DecryptedText
          text="Revealed from the end"
          sequential
          revealDirection="end"
          className="text-2xl font-bold text-primary"
          encryptedClassName="text-2xl font-bold text-muted-foreground"
        />
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Sequential, center out</p>
        <DecryptedText
          text="Center outward"
          sequential
          revealDirection="center"
          className="text-2xl font-bold text-primary"
          encryptedClassName="text-2xl font-bold text-muted-foreground"
        />
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Scramble only (batch reveal)</p>
        <DecryptedText
          text="Scramble then reveal"
          sequential={false}
          maxIterations={12}
          speed={60}
          className="text-2xl font-bold text-primary"
          encryptedClassName="text-2xl font-bold text-muted-foreground"
        />
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Reveal when in view</p>
        <DecryptedText
          text="Animate on scroll into view"
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
