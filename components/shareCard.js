import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
  } from "next-share";
  
  export default function ShareCard({ url, title, flexDirection }) {
    url = "https://cityzen-ruby.vercel.app" + url;
    return (
      <div className={`flex ${flexDirection} gap-2`}>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={20} round />
        </TwitterShareButton>
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon size={20} round />
        </WhatsappShareButton>
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon size={20} round />
        </FacebookShareButton>
      </div>
    );
  }
  