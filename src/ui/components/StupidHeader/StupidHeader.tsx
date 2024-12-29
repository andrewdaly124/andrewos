import styles from "./StupidHeader.module.scss";

export function StupidHeader() {
  return (
    <div className={styles.stupidHeader}>
      <StupidTab text="File" />
      <StupidTab text="Edit" />
      <StupidTab text="View" />
      <StupidTab text="Image" />
      <StupidTab text="Options" />
      <StupidTab text="Help" />
    </div>
  );
}

type StupidTabProps = {
  text: string;
};

function StupidTab({ text }: StupidTabProps) {
  if (text.length === 0) {
    return null;
  }

  const firstLetter = text[0];
  const restOfIt = text.slice(-1 * (text.length - 1));

  return (
    <span className={styles.stupidTab}>
      <u>{firstLetter}</u>
      {restOfIt}
    </span>
  );
}
