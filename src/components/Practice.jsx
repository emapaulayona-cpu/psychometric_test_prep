import { useRef, useState } from 'react'
import VocabPreview from './VocabPreview.jsx'
import Question from './Question.jsx'

const hasVocab = (q) => Array.isArray(q.hard_words) && q.hard_words.length > 0

// Drives one batch: for each question, optionally show the vocab preview, then the
// question. Collects results and hands them to onComplete when the batch is done.
export default function Practice({ batch, onComplete }) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState(() =>
    hasVocab(batch[0]) ? 'vocab' : 'question',
  )
  const resultsRef = useRef([])

  const question = batch[index]

  function handleAnswer(result) {
    resultsRef.current.push(result)
    const next = index + 1
    if (next >= batch.length) {
      onComplete(resultsRef.current)
      return
    }
    setIndex(next)
    setPhase(hasVocab(batch[next]) ? 'vocab' : 'question')
  }

  if (phase === 'vocab') {
    return (
      <VocabPreview
        words={question.hard_words}
        onContinue={() => setPhase('question')}
      />
    )
  }

  return (
    <Question
      question={question}
      index={index}
      total={batch.length}
      onAnswer={handleAnswer}
    />
  )
}
