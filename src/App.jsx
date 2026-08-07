import { useState } from 'react'
import questions from './data/questions.json'
import { useProgress } from './hooks/useProgress.js'
import MobileShell from './components/MobileShell.jsx'
import Home from './components/Home.jsx'
import Practice from './components/Practice.jsx'
import Summary from './components/Summary.jsx'

const BATCH_SIZE = 10

export default function App() {
  const progress = useProgress(questions)
  const [screen, setScreen] = useState('home') // 'home' | 'practice' | 'summary'
  const [batch, setBatch] = useState([])
  const [results, setResults] = useState([])

  function beginPractice() {
    const next = progress.startBatch(BATCH_SIZE)
    setBatch(next)
    setResults([])
    setScreen('practice')
  }

  function finishPractice(batchResults) {
    progress.commitBatch(batchResults)
    setResults(batchResults)
    setScreen('summary')
  }

  return (
    <MobileShell>
      {screen === 'home' && (
        <Home
          solvedCount={progress.solvedCount}
          totalQuestions={progress.totalQuestions}
          streak={progress.streak}
          avgTimeSec={progress.avgTimeSec}
          onStart={beginPractice}
        />
      )}

      {screen === 'practice' && (
        <Practice
          key={batch.map((q) => q.id).join('-')}
          batch={batch}
          onComplete={finishPractice}
        />
      )}

      {screen === 'summary' && (
        <Summary
          batch={batch}
          results={results}
          onHome={() => setScreen('home')}
          onAgain={beginPractice}
        />
      )}
    </MobileShell>
  )
}
