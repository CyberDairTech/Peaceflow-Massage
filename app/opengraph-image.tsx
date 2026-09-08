import { ImageResponse } from "next/og";

export const alt = "PeaceFlow Massage — Grand Junction, CO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(155deg, #4A2F1F 0%, #8B5E3C 58%, #C79A6E 100%)",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontStyle: "italic",
            fontWeight: 500,
            color: "#F3E9DA",
            fontFamily: "Georgia, serif",
          }}
        >
          peaceflow
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#DCC7AC",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Massage · Grand Junction, CO
        </div>
      </div>
    ),
    { ...size },
  );
}
