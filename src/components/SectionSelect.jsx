import { Sparkles, ChevronLeft, GraduationCap } from 'lucide-react'

function SectionCard({ section, solvedCount, totalQuestions, onSelect }) {
  const Icon = section.icon
  const pct =
    totalQuestions > 0 ? Math.round((solvedCount / totalQuestions) * 100) : 0

  return (
    <button
      onClick={onSelect}
      className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 shadow-card text-start transition-all duration-150 active:scale-[0.98] animate-fade-up"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500 shadow-[0_6px_16px_-4px_rgba(35,126,72,0.5)]">
        <Icon className="h-6 w-6 text-white" strokeWidth={2.25} />
      </div>
      <div className="flex-1">
        <div className="font-display text-lg font-bold text-brand-900">
          {section.title}
        </div>
        <div className="mt-0.5 text-xs font-medium text-brand-700/70">
          {solvedCount} מתוך {totalQuestions} הושלמו · {pct}%
        </div>
      </div>
      <ChevronLeft className="h-5 w-5 shrink-0 text-brand-400" strokeWidth={2.5} />
    </button>
  )
}

export default function SectionSelect({ sections, onSelect }) {
  return (
    <div className="flex flex-1 flex-col px-6 pb-8 pt-12 animate-fade-up">
      <header className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 shadow-[0_6px_16px_-4px_rgba(35,126,72,0.5)]">
          <Sparkles className="h-7 w-7 text-white" strokeWidth={2.5} />
        </div>
        <h1 className="mt-3 font-display text-2xl font-extrabold text-brand-900">
          פציחומטרי
        </h1>
        <p className="mt-1.5 text-sm text-brand-800/70">מה נתרגל היום?</p>
      </header>

      {/* Decorative mark between the greeting and the section list */}
      <div className="mt-6 flex justify-center" aria-hidden="true">
        <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-b from-brand-500 to-brand-600 shadow-[0_16px_32px_-10px_rgba(35,126,72,0.55)] animate-float">
          <GraduationCap className="h-9 w-9 text-white" strokeWidth={2.25} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {sections.map(({ config, solvedCount, totalQuestions }) => (
          <SectionCard
            key={config.id}
            section={config}
            solvedCount={solvedCount}
            totalQuestions={totalQuestions}
            onSelect={() => onSelect(config.id)}
          />
        ))}
      </div>
    </div>
  )
}
