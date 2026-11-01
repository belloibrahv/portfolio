import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const SHARE_SIZE = { width: 1200, height: 630 };

/** The card people see when a link is shared: cloth on one side, words on the other. */
export function shareImage({ kicker, title, cloth, accent }: { kicker: string; title: string; cloth: string; accent: string }) {
  const serif = readFileSync(path.join(process.cwd(), "assets/fonts/DMSerifDisplay-Regular.ttf"));
  const src = `data:image/svg+xml;base64,${Buffer.from(cloth).toString("base64")}`;
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#F6F0E6", fontFamily: "DM Serif" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} width={420} height={630} alt="" style={{ objectFit: "cover" }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: 56 }}>
        <div style={{ display: "flex", fontSize: 28, color: accent }}>{kicker}</div>
        <div style={{ display: "flex", fontSize: title.length > 48 ? 62 : 76, lineHeight: 1.06, color: "#1C1712" }}>{title}</div>
        <div style={{ display: "flex", fontSize: 28, color: "#6B5E4E" }}>Bello Sheu Ibrahim</div>
      </div>
    </div>,
    { ...SHARE_SIZE, fonts: [{ name: "DM Serif", data: serif, weight: 400, style: "normal" }] },
  );
}
