import { useEffect, useRef, useState } from 'react'

// Shared attempt state for one question: tracks taps, the scored first attempt,
// and the explanation toggle. Study-mode feedback — she may keep trying after a
// wrong answer, but the score reflects only the first attempt.
export function useQuestionAttempt(question, onAnswer) {
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

  return { picks, first, answered: first !== null, solved, select, next, showExplain, setShowExplain }
}
