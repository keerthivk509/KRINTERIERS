import React from "react";
import {
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./FooterSocial.css";
import { SOCIAL_LINKS_URL } from "../../assets/data/socialLink";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    icon: FaInstagram,
    url: SOCIAL_LINKS_URL.instagram_url,
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    url: SOCIAL_LINKS_URL.youtube_url,
  },
  {
    name: "Gmail",
    icon: FaGoogle,
    url: SOCIAL_LINKS_URL.gmail_url,
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    url: SOCIAL_LINKS_URL.whatapp_url,
  },
];

export default function FooterSocial() {
  return (
    <div className="footer-social">
      {SOCIAL_LINKS.map(({ name, icon: Icon, url }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-item"
          aria-label={name}
          title={name}
        >
          <Icon size={30} />
        </a>
      ))}
    </div>
  );
}
