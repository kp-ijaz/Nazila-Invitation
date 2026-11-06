/** Script name whose initials are clear serif capitals (the script font's own capitals read as lowercase). */
export default function ScriptName({ name }: { name: string }) {
  return name.split(" ").map((word, i) => (
    <span key={i}>
      {i > 0 && " "}
      <span className="name-initial">{word.charAt(0).toUpperCase()}</span>
      {word.slice(1)}
    </span>
  ));
}
