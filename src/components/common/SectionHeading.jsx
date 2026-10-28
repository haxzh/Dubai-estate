export default function SectionHeading({ eyebrow, title, copy, light = false }) {
  return <div className={`section-heading ${light ? 'light-text' : ''}`}>
    <div className="eyebrow"><span /> {eyebrow}</div>
    <h2>{title}</h2>
    {copy && <p>{copy}</p>}
  </div>
}
