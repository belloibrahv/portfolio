import { clothSvg } from "@/lib/adire";
import { SHARE_SIZE, shareImage } from "@/lib/share-image";

export const size = SHARE_SIZE;
export const contentType = "image/png";
export const alt = "Bello Sheu Ibrahim, Full-Stack Software Engineer and Technical Lead";

export default function Image() {
  return shareImage({ kicker: "Full-stack engineer · Lagos", title: "I ship the whole thing.", cloth: clothSvg("bello-sheu-ibrahim", "workshop"), accent: "#1F3266" });
}
