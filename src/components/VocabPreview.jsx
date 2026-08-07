import { BookOpen, ArrowLeft } from 'lucide-react'

// Shown before a question that has hard_words. The timer is paused (it only starts
// once the Question screen mounts), so she can read definitions without pressure.
export default function VocabPreview({ words, onContinue }) {
  return (
    <div className="flex flex-1 flex-col px-6 pb-8 pt-12 animate-scale-in">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100">
          <BookOpen className="h-7 w-7 text-brand-600" strokeWidth={2.25} />
        </div>
        <h2 className="mt-4 font-display text-2xl font-extrabold text-brand-900">
          מילים לפני שמתחילים
        </h2>
        <p className="mt-1.5 text-sm text-brand-800/70">
          כמה מילים שכדאי להכיר לשאלה הבאה. הזמן עדיין לא רץ.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {words.map((w, i) => (
          <div
            key={w.word}
            className="rounded-2xl bg-white p-4 shadow-card animate-fade-up"
            style={{ animationDelay: `${i * 80 + 100}ms` }}
          >
            <div className="mb-1 inline-flex rounded-lg bg-brand-50 px-2.5 py-1 font-display text-base font-bold text-brand-700">
              {w.word}
            </div>
            <p className="text-[15px] leading-relaxed text-brand-900/80">
              {w.definition}
            </p>
          </div>
        ))}
      </div>

      <div className="flex-1" />

      <button
        onClick={onContinue}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-brand-500 to-brand-600 px-6 py-4 font-display text-lg font-bold text-white shadow-[0_12px_28px_-8px_rgba(35,126,72,0.6)] transition-all duration-200 active:scale-[0.98] active:shadow-press"
      >
        הבנתי, למשימה
        <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
      </button>
    </div>
  )
}
