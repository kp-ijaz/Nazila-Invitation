/** Script name whose initial is a clear serif capital (Great Vibes' own capitals read as lowercase). */
export default function ScriptName({ name }: { name: string }) {
  return (
    <>
      <span className="name-initial">{name.charAt(0).toUpperCase()}</span>
      {name.slice(1)}
    </>
  );
}
