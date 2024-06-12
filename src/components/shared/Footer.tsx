import Link from "next/link";
import { NewTwitterIcon, InstagramIcon, DiscordIcon } from "hugeicons-react";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between my-6 items-center text-slate-100">
      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        <h3>
          Become<span className="text-primary">Better</span>
        </h3>
      </div>
      <div className="text-slate-900 dark:text-slate-100">
        <p>Copyrighted &copy; by BecomeBetter 2024</p>
      </div>
      <div className="flex gap-4">
        <Link href={"https://x.com/fawad_ali_101"} target="_blank">
          <NewTwitterIcon
            className="transform transition-transform duration-200 ease-in-out hover:scale-105 text-black dark:text-slate-100"
            size={20}
          />
        </Link>
        <Link href={"https://instagram.com/fawad.___.1"} target="_blank">
          <InstagramIcon
            className="transform transition-transform duration-200 ease-in-out hover:scale-105 text-black dark:text-slate-100"
            size={20}
          />
        </Link>
        <Link
          href={"https://discordapp.com/users/456152202281484317"}
          target="_blank"
        >
          <DiscordIcon
            className="transform transition-transform duration-200 ease-in-out hover:scale-105 text-black dark:text-slate-100"
            size={20}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
