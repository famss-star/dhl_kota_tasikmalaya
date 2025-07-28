import React from "react";
import TikTokPlaylistEmbed from "./TikTokPlaylistEmbed"; // sesuaikan path

interface SocialMediaCardProps {
  platform: "youtube" | "tiktok" | "instagram";
  title: string;
  url: string;
}

function getEmbedUrl(platform: string, url: string) {
  if (platform === "youtube") {
    const match = url.match(/(?:v=|youtu.be\/)([\w-]+)/);
    const videoId = match ? match[1] : "";
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
  }
  if (platform === "tiktok") {
    const match = url.match(/video\/(\d+)/);
    const videoId = match ? match[1] : "";
    return `https://www.tiktok.com/embed/v2/${videoId}`;
  }
  if (platform === "instagram") {
    const match = url.match(/instagram.com\/(?:reel|p)\/([\w-]+)/);
    const postId = match ? match[1] : "";
    return `https://www.instagram.com/${url.includes('/reel/') ? 'reel' : 'p'}/${postId}/embed`;
  }
  return url;
}

interface SocialMediaGalleryProps {
  cards: SocialMediaCardProps[];
}

const SocialMediaGallery: React.FC<SocialMediaGalleryProps> = ({ cards }) => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
      {cards.map((card, idx) => {
        if (card.platform === "tiktok" && card.url.includes("/playlist/")) {
          return (
            <div key={idx} className="w-full">
              <TikTokPlaylistEmbed url={card.url} />
            </div>
          );
        }

        const embedUrl = getEmbedUrl(card.platform, card.url);

        return (
          <div key={idx} className="w-full">
            <iframe
              src={embedUrl}
              title={card.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full rounded"
              style={{ height: "auto", minHeight: 200 }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SocialMediaGallery;
