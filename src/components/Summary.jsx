import { Home as HomeIcon, RotateCw, Check, X, Clock, Gauge } from 'lucide-react'

function fmtClock(totalSec) {
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function encouragement(ratio) {
  if (ratio === 1) return 'מושלם! כל הכבוד 🎯'
  if (ratio >= 0.8) return 'עבודה יפה מאוד!'
  if (ratio >= 0.5) return 'יפה, ממשיכים להשתפר!'
  return 'כל תרגול מקרב אותך. קדימה!'
}

function ReviewRow({ q, result }) {
  const chosen = q.options.find((o) => o.id === result.chosen)
  const correct = q.options.find((o) => o.is_correct)
  const ok = result.correct

  return (
    <div className="rounded-2xl bg-white p-4 shadow-card">
      <div className="flex items-center justify-between">
        <span className="font-display text-base font-bold text-brand-900">
          {q.word1} : {q.word2}
        </span>
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full ${
            ok ? 'bg-brand-100 text-brand-600' : 'bg-red-100 text-red-500'
          }`}
        >
          {ok ? (
            <Check className="h-4 w-4" strokeWidth={3} />
          ) : (
            <X className="h-4 w-4" strokeWidth={3} />
          )}
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-1.5 text-sm">
        <div
          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 ${
            ok ? 'bg-brand-50 text-brand-700' : 'bg-red-50 text-red-600'
          }`}
        >
          <span className="text-xs font-semibold opacity-70">התשובה שלך:</span>
          <span className="font-semibold">{chosen?.text}</span>
        </div>
        {!ok && (
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-2.5 py-1.5 text-brand-700">
            <span className="text-xs font-semibold opacity-70">הנכונה:</span>
            <span className="font-semibold">{correct?.text}</span>
          </div>
        )}
      </div>

      {!ok && (
        <p className="mt-2.5 rounded-xl bg-brand-50/60 px-3 py-2.5 text-[13px] leading-relaxed text-brand-900/75">
          <span className="font-bold text-brand-700">משפט הקשר: </span>
          {q.logical_connection}
        </p>
      )}
    </div>
  )
}

export default function Summary({ batch, results, onHome, onAgain }) {
  const correctCount = results.filter((r) => r.correct).length
  const total = batch.length
  const ratio = total > 0 ? correctCount / total : 0
  const totalSec = Math.round(
    results.reduce((sum, r) => sum + r.timeMs, 0) / 1000,
  )
  const avgSec = total > 0 ? Math.round(totalSec / total) : 0

  return (
    <div className="flex flex-1 flex-col px-6 pb-8 pt-10 animate-fade-up">
      {/* Score hero */}
      <div className="flex flex-col items-center text-center">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-b from-brand-500 to-brand-600 shadow-[0_16px_36px_-10px_rgba(35,126,72,0.6)]">
          <div className="flex h-[7.25rem] w-[7.25rem] flex-col items-center justify-center rounded-full bg-white">
            <span className="font-display text-4xl font-extrabold text-brand-900 leading-none tabular-nums">
              {correctCount}
              <span className="text-2xl text-brand-400">/{total}</span>
            </span>
            <span className="mt-1 text-xs font-semibold text-brand-700/70">
              תשובות נכונות
            </span>
          </div>
        </div>
        <p className="mt-4 font-display text-xl font-bold text-brand-900">
          {encouragement(ratio)}
        </p>
      </div>

      {/* Time stats */}
      <div className="mt-6 flex gap-3">
        <div className="flex-1 rounded-2xl bg-white p-3.5 shadow-card flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50">
            <Clock className="h-5 w-5 text-brand-600" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display text-lg font-bold text-brand-900 tabular-nums leading-none">
              {fmtClock(totalSec)}
            </div>
            <div className="text-[11px] font-medium text-brand-700/70">זמן כולל</div>
          </div>
        </div>
        <div className="flex-1 rounded-2xl bg-white p-3.5 shadow-card flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50">
            <Gauge className="h-5 w-5 text-brand-600" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display text-lg font-bold text-brand-900 tabular-nums leading-none">
              {avgSec}″
            </div>
            <div className="text-[11px] font-medium text-brand-700/70">
              ממוצע לשאלה
            </div>
          </div>
        </div>
      </div>

      {/* Review */}
      <h3 className="mt-7 mb-3 font-display text-lg font-bold text-brand-900">
        סקירת התרגול
      </h3>
      <div className="flex flex-col gap-3">
        {batch.map((q, i) => (
          <ReviewRow key={q.id} q={q} result={results[i]} />
        ))}
      </div>

      {/* CTAs */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={onAgain}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-brand-500 to-brand-600 px-6 py-4 font-display text-lg font-bold text-white shadow-[0_12px_28px_-8px_rgba(35,126,72,0.6)] transition-all duration-200 active:scale-[0.98] active:shadow-press"
        >
          <RotateCw className="h-5 w-5" strokeWidth={2.5} />
          תרגול נוסף
        </button>
        <button
          onClick={onHome}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-display text-base font-bold text-brand-700 shadow-card transition-all duration-200 active:scale-[0.98]"
        >
          <HomeIcon className="h-5 w-5" strokeWidth={2.5} />
          חזרה למסך הראשי
        </button>
      </div>
    </div>
  )
}
