import { Flame, Timer as TimerIcon, Sparkles, Play } from 'lucide-react'
import ProgressRing from './ProgressRing.jsx'

function StatCard({ icon, iconClass, value, label }) {
  return (
    <div className="flex-1 rounded-2xl bg-white shadow-card px-3 py-3.5 flex flex-col items-center gap-1">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full ${iconClass}`}
      >
        {icon}
      </div>
      <div className="font-display text-2xl font-bold text-brand-900 tabular-nums leading-none">
        {value}
      </div>
      <div className="text-[11px] font-medium text-brand-700/70">{label}</div>
    </div>
  )
}

function fmtAvg(sec) {
  if (!sec) return '—'
  const r = Math.round(sec)
  if (r < 60) return `${r}″`
  return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`
}

export default function Home({
  solvedCount,
  totalQuestions,
  streak,
  avgTimeSec,
  onStart,
}) {
  const pctText =
    totalQuestions > 0
      ? Math.round((solvedCount / totalQuestions) * 100)
      : 0

  return (
    <div className="flex flex-1 flex-col px-6 pb-8 pt-10 animate-fade-up">
      {/* Header */}
      <header className="flex items-center justify-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 shadow-[0_6px_16px_-4px_rgba(35,126,72,0.5)]">
          <Sparkles className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <h1 className="font-display text-2xl font-extrabold text-brand-900">
          אנלוגיות כיס
        </h1>
      </header>

      {/* Progress ring */}
      <div className="mt-9 flex justify-center">
        <ProgressRing value={solvedCount} max={totalQuestions} size={196} stroke={15}>
          <span className="font-display text-5xl font-extrabold text-brand-900 leading-none tabular-nums">
            {solvedCount}
          </span>
          <span className="mt-1 text-sm font-semibold text-brand-700/70">
            מתוך {totalQuestions} שאלות
          </span>
          <span className="mt-2 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-600">
            {pctText}% הושלמו
          </span>
        </ProgressRing>
      </div>

      <p className="mt-6 text-center text-sm leading-relaxed text-brand-800/70">
        הידעת? שאלות האנלוגיה מהוות כ־<span className="font-bold text-brand-700">30%</span> מציון
        הפרק המילולי בפסיכומטרי.
      </p>

      {/* Stats */}
      <div className="mt-6 flex gap-3">
        <StatCard
          icon={<Flame className="h-5 w-5 text-orange-500" strokeWidth={2.5} />}
          iconClass="bg-orange-50"
          value={streak}
          label="ימים ברצף"
        />
        <StatCard
          icon={<TimerIcon className="h-5 w-5 text-brand-600" strokeWidth={2.5} />}
          iconClass="bg-brand-50"
          value={fmtAvg(avgTimeSec)}
          label="זמן ממוצע לשאלה"
        />
      </div>

      <div className="flex-1" />

      {/* CTA */}
      <button
        onClick={onStart}
        className="group mt-8 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-b from-brand-500 to-brand-600 px-6 py-4 font-display text-lg font-bold text-white shadow-[0_12px_28px_-8px_rgba(35,126,72,0.6)] transition-all duration-200 active:scale-[0.98] active:shadow-press"
      >
        <Play className="h-5 w-5 fill-current" />
        התחל תרגול (10 שאלות)
      </button>
    </div>
  )
}
