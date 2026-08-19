import { useRef, useState } from 'react'

// Drives one batch: shows each question in turn via the section's QuestionComponent,
// collects results, and hands them to onComplete when the batch is done.
export default function Practice({ batch, QuestionComponent, onComplete }) {
  const [index, setIndex] = useState(0)
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
  }

  return (
    <QuestionComponent
      question={question}
      index={index}
      total={batch.length}
      onAnswer={handleAnswer}
    />
  )
}
