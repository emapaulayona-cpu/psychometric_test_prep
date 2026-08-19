import { Check, X, Lightbulb, ChevronDown, ArrowLeft, BookOpen } from 'lucide-react'
import Timer from './Timer.jsx'
import { useQuestionAttempt } from '../hooks/useQuestionAttempt.js'

const LETTERS = ['א', 'ב', 'ג', 'ד']

// One sentence-completion question. Same study-mode interaction as the analogy
// Question component (see useQuestionAttempt) — only the prompt/explanation labels differ.
export default function EnglishQuestion({ question, index, total, onAnswer }) {
  const { picks, first, answered, solved, select, next, showExplain, setShowExplain } =
    useQuestionAttempt(question, onAnswer)

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

      {/* Sentence prompt */}
      <div className="mt-9 animate-scale-in">
        <p className="text-center text-sm font-medium text-brand-700/70">
          השלימו את המשפט:
        </p>
        <div className="mt-4 rounded-2xl bg-brand-900 px-5 py-5 shadow-card" dir="ltr">
          <p className="text-start text-lg font-semibold leading-relaxed text-white">
            {question.sentence}
          </p>
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
                dir="ltr"
                className={`font-display text-lg font-semibold text-start ${
                  state === 'wrong' ? 'text-red-600' : 'text-brand-900'
                }`}
              >
                {opt.text}
              </span>
            </button>
          )
        })}
      </div>

      {/* Hard words — revealed only after answering, so they can't hint the answer */}
      {answered && question.hard_words.length > 0 && (
        <div className="mt-4 flex flex-col gap-2 animate-fade-up">
          {question.hard_words.map((w) => (
            <div key={w.word} className="rounded-xl bg-white px-4 py-3 shadow-card">
              <div className="mb-1 inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-2.5 py-1 font-display text-sm font-bold text-brand-700">
                <BookOpen className="h-3.5 w-3.5" strokeWidth={2.5} />
                <span dir="ltr">{w.word}</span>
              </div>
              <p className="text-[14px] leading-relaxed text-brand-900/80">
                {w.definition}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Explanation toggle — only after a wrong first answer */}
      {answered && !first.correct && (
        <div className="mt-4">
          <button
            onClick={() => setShowExplain((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-brand-700 shadow-card"
          >
            <span className="flex items-center gap-2 font-display text-sm font-bold">
              <Lightbulb className="h-4 w-4 text-amber-500" strokeWidth={2.5} />
              {showExplain ? 'הסתר הסבר' : 'הצג הסבר'}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showExplain ? 'rotate-180' : ''}`}
              strokeWidth={2.5}
            />
          </button>
          {showExplain && (
            <p className="mt-2 rounded-xl bg-brand-50/70 px-4 py-3 text-[14px] leading-relaxed text-brand-900/80 animate-fade-up">
              {question.explanation}
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
