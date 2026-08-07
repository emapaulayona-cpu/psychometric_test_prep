import { useEffect, useRef, useState } from 'react'
import { Clock } from 'lucide-react'

function fmt(totalSec) {
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// Visible count-up timer. Restarts when `resetKey` changes; freezes when `stopped` is true.
export default function Timer({ resetKey, stopped = false }) {
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef(Date.now())

  useEffect(() => {
    startRef.current = Date.now()
    setElapsed(0)
  }, [resetKey])

  useEffect(() => {
    if (stopped) return
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000))
    }, 500)
    return () => clearInterval(id)
  }, [resetKey, stopped])

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-brand-700 tabular-nums">
      <Clock className="h-4 w-4" strokeWidth={2.5} />
      <span className="font-display font-semibold text-sm tracking-wide">
        {fmt(elapsed)}
      </span>
    </div>
  )
}
