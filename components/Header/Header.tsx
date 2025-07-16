// components/Header/Header.tsx

import css from "./Header.module.css";
import Link from "next/link";
import TagsMenu from "../TagsMenu/TagsMenu";
import { Tag } from "@/types/note";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

const Header = () => {
  const tagValues = Object.values(Tag); // ["Todo", "Work", "Personal", "Meeting", "Shopping"]

  return (
    <header className={css.header}>
      <Link href="/">NoteHub</Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <AuthNavigation />
          <li>
            <TagsMenu categories={["All", ...tagValues]} />
          </li>
          <li>
            <Link href="/" aria-label="Home">
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
