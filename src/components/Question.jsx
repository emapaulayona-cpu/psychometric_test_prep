import { useEffect, useRef, useState } from 'react'
import { Check, X, Lightbulb, ChevronDown, ArrowLeft } from 'lucide-react'
import Timer from './Timer.jsx'

const LETTERS = ['א', 'ב', 'ג', 'ד']

// One analogy question. Study-mode feedback: taps are marked correct/incorrect, she may
// keep trying after a wrong answer, but the SCORE reflects only the first attempt.
export default function Question({ question, index, total, onAnswer }) {
  const startRef = useRef(Date.now())
  const advancedRef = useRef(false)
  const [picks, setPicks] = useState([]) // option ids she has tapped
  const [first, setFirst] = useState(null) // { chosen, correct, timeMs } — scored attempt
  const [showExplain, setShowExplain] = useState(false)

  useEffect(() => {
    startRef.current = Date.now()
    advancedRef.current = false
    setPicks([])
    setFirst(null)
    setShowExplain(false)
  }, [question.id])

  const solved = first?.correct || picks.some((id) => isCorrect(id))

  function isCorrect(optId) {
    return question.options.find((o) => o.id === optId)?.is_correct
  }

  function select(opt) {
    if (solved || picks.includes(opt.id)) return
    setPicks((p) => [...p, opt.id])
    if (first === null) {
      setFirst({
        chosen: opt.id,
        correct: opt.is_correct,
        timeMs: Date.now() - startRef.current,
      })
    }
  }

  function next() {
    if (advancedRef.current || first === null) return
    advancedRef.current = true
    onAnswer({
      id: question.id,
      chosen: first.chosen,
      correct: first.correct,
      timeMs: first.timeMs,
    })
  }

  const answered = first !== null
  const lastQuestion = index + 1 === total
  const progress = (index / total) * 100

  return (
    <div className="flex flex-1 flex-col px-6 pb-8 pt-8">
      {/* Top bar: counter + timer */}
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-bold text-brand-700">
          שאלה {index + 1} / {total}
        </span>
        <Timer resetKey={question.id} stopped={answered} />
      </div>

      {/* Batch progress bar */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-brand-100">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Base analogy */}
      <div className="mt-9 animate-scale-in">
        <p className="text-center text-sm font-medium text-brand-700/70">
          מצאו את הזוג בעל הקשר הדומה:
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="rounded-2xl bg-brand-900 px-5 py-4 font-display text-xl font-bold text-white shadow-card">
            {question.word1}
          </div>
          <span className="font-display text-2xl font-black text-brand-400">:</span>
          <div className="rounded-2xl bg-brand-900 px-5 py-4 font-display text-xl font-bold text-white shadow-card">
            {question.word2}
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="mt-8 flex flex-col gap-3">
        {question.options.map((opt, i) => {
          const tapped = picks.includes(opt.id)
          const correct = opt.is_correct
          let state = 'idle'
          if (tapped) state = correct ? 'correct' : 'wrong'

          const base =
            'flex items-center gap-3 rounded-2xl border-2 bg-white px-4 py-4 text-start shadow-card transition-all duration-150'
          const byState = {
            idle: solved
              ? 'border-transparent opacity-60'
              : 'border-transparent hover:border-brand-200 active:scale-[0.98] animate-fade-up',
            correct: 'border-brand-500 bg-brand-50 animate-pop',
            wrong: 'border-red-400 bg-red-50 animate-pop',
          }[state]

          return (
            <button
              key={opt.id}
              onClick={() => select(opt)}
              disabled={solved || tapped}
              className={`${base} ${byState}`}
              style={{
                animationDelay:
                  !answered && state === 'idle' ? `${i * 60 + 120}ms` : '0ms',
              }}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${
                  state === 'correct'
                    ? 'bg-brand-500 text-white'
                    : state === 'wrong'
                      ? 'bg-red-400 text-white'
                      : 'bg-brand-50 text-brand-600'
                }`}
              >
                {state === 'correct' ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : state === 'wrong' ? (
                  <X className="h-4 w-4" strokeWidth={3} />
                ) : (
                  LETTERS[i]
                )}
              </span>
              <span
                className={`font-display text-lg font-semibold ${
                  state === 'wrong' ? 'text-red-600' : 'text-brand-900'
                }`}
              >
                {opt.text}
              </span>
            </button>
          )
        })}
      </div>

      {/* Explanation toggle — only after a wrong first answer */}
      {answered && !first.correct && (
        <div className="mt-4">
          <button
            onClick={() => setShowExplain((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-brand-700 shadow-card"
          >
            <span className="flex items-center gap-2 font-display text-sm font-bold">
              <Lightbulb className="h-4 w-4 text-amber-500" strokeWidth={2.5} />
              {showExplain ? 'הסתר הסבר' : 'הצג משפט הקשר'}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showExplain ? 'rotate-180' : ''}`}
              strokeWidth={2.5}
            />
          </button>
          {showExplain && (
            <p className="mt-2 rounded-xl bg-brand-50/70 px-4 py-3 text-[14px] leading-relaxed text-brand-900/80 animate-fade-up">
              {question.logical_connection}
            </p>
          )}
        </div>
      )}

      <div className="flex-1" />

      {/* Next */}
      {answered && (
        <button
          onClick={next}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-brand-500 to-brand-600 px-6 py-4 font-display text-lg font-bold text-white shadow-[0_12px_28px_-8px_rgba(35,126,72,0.6)] transition-all duration-200 active:scale-[0.98] active:shadow-press animate-fade-up"
        >
          {lastQuestion ? 'לסיכום' : 'לשאלה הבאה'}
          <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
      )}
    </div>
  )
}
