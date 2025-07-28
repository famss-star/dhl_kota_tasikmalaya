import React, { useEffect, useRef } from "react";

interface Props {
  url: string;
}

const TikTokPlaylistEmbed: React.FC<Props> = ({ url }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Hapus skrip sebelumnya (jika ada)
    const existing = ref.current.querySelector("script[src='https://www.tiktok.com/embed.js']");
    if (existing) ref.current.removeChild(existing);

    // Tambahkan blok quote
    ref.current.innerHTML = `
      <blockquote class="tiktok-embed" cite="${url}" data-embed-type="playlist" style="max-width: 605px;min-width: 325px;"></blockquote>
    `;

    // Tambahkan script TikTok embed
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    ref.current.appendChild(script);
  }, [url]);

  return <div ref={ref} />;
};

export default TikTokPlaylistEmbed;
