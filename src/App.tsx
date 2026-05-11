import { useState } from "react";
import './App.css';

function toHex(n: number): string {
  return n.toString(16).padStart(2, '0')
}

type SliderProps = {
  label: string
  color: string
  value: number
  onChange: (n: number) => void
}

function Slider({ label, color, value, onChange }: SliderProps) {
  return (
    <div className="slider-group">
      <div className="slider-header">
        <span style={{ color }}>{label}</span>
        <span>{value}</span>
      </div>
      <input className={`${label.toLowerCase()}-slider`}
        type="range" value={value} min={0} max={255} onChange={e => onChange(Number(e.target.value))} />
    </div>
  )
}

type SwatchProps = { hex: string; onClick: () => void }

function Swatch({ hex, onClick }: SwatchProps) {
  return (
    <button className="swatch-dot" style={{ background: hex }} onClick={onClick} />
  )
}

type SavedColor = {
  r: number
  g: number
  b: number
  hex: string
}
export default function App() {
  const [r, setR] = useState<number>(61)
  const [g, setG] = useState<number>(72)
  const [b, setB] = useState<number>(141)
  const [saved, setSaved] = useState<SavedColor[]>([])
  const [copyLabel, setCopyLabel] = useState<string>('Copy hex')
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  const rgb = `rgb(${r},${g},${b})`

  function handleCopy() {
    navigator.clipboard.writeText(hex)
    setCopyLabel('Copied!')
    setTimeout(() => setCopyLabel('Copy hex'), 1400)
  }

  function handleSave() {
    const newcolor: SavedColor = { r, g, b, hex }
    if (newcolor)
      setSaved(prev => {
        const alreadyexists = prev.some((c) => c.hex === newcolor.hex);
        if (alreadyexists) {
          return prev;
        }
        return [...prev, newcolor]
      })

  }
  function loadColor(c: SavedColor) {
    setR(c.r); setG(c.g); setB(c.b);
  }
  return (
    <div className="page">
      <div className="preview"
      >
        <h1>RGB COLOR PICKER</h1>
        <div className="color-display" style={{ background: rgb }}>
          <div className="color-info">

            <div className="badge">
              {hex}
            </div>

            <div className="badge">
              {rgb}
            </div>

          </div>

        </div>
        <Slider label="Red" color="#ff6b6b" value={r} onChange={setR} />
        <Slider label="Green" color="#51cf66" value={g} onChange={setG} />
        <Slider label="Blue" color="#339af0" value={b} onChange={setB} />


        <div className="actions">
          <button onClick={handleCopy}>{copyLabel}</button>
          <button onClick={handleSave}>Save color</button>
        </div>
        <div className="saved-section">

          <h2>Saved Colors</h2>

          <div className="swatches">

            {saved.map((c, i) => (
              <Swatch
                key={i}
                hex={c.hex}
                onClick={() => loadColor(c)}
              />
            ))}

          </div>

        </div>
      </div>
    </div>
  )
}
