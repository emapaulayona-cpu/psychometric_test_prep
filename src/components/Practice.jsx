import { useRef, useState } from 'react'
import Question from './Question.jsx'

// Drives one batch: shows each question in turn, collects results, and hands
// them to onComplete when the batch is done.
export default function Practice({ batch, onComplete }) {
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
    <Question
      question={question}
      index={index}
      total={batch.length}
      onAnswer={handleAnswer}
    />
  )
}
