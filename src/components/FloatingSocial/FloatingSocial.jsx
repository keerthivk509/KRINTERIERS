import React, { useState } from "react";
import { Share2, X, Mail } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaYoutube, FaGoogle } from "react-icons/fa";
import "./FloatingSocial.css";

const SOCIAL_LINKS = [
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    url: "https://wa.me/91YOURNUMBER",
    color: "#25D366",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/YOURUSERNAME/",
    color: "#E4405F",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    url: "https://www.youtube.com/@YOURCHANNEL",
    color: "#FF0000",
  },
  {
    name: "Gmail",
    icon: FaGoogle,
    url: "https://mail.google.com/mail/?view=cm&to=YOUR_EMAIL@gmail.com",
    color: "#EA4335",
  },
];

export default function FloatingSocial() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="floating-social">
      {console.log("isopen", isOpen)}
      {isOpen && (
        <div className={`social-menu ${isOpen ? "social-menu-open" : ""}`}>
          {SOCIAL_LINKS.map(({ name, icon: Icon, url, color }, index) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-item"
              style={{
                "--social-color": color,
                "--item-index": index,
              }}
              aria-label={name}
              title={name}
              tabIndex={isOpen ? 0 : -1}
            >
              <span className="social-tooltip">{name}</span>
              <Icon size={22} />
            </a>
          ))}
        </div>
      )}

      <button
        type="button"
        className={`social-main-button ${isOpen ? "social-main-active" : ""}`}
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Close social links" : "Open social links"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={25} /> : <Share2 size={25} />}
      </button>
    </div>
  );
}
