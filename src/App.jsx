import { useState } from 'react'
import { SECTIONS } from './data/sections.js'
import { useProgress } from './hooks/useProgress.js'
import MobileShell from './components/MobileShell.jsx'
import SectionSelect from './components/SectionSelect.jsx'
import Home from './components/Home.jsx'
import Practice from './components/Practice.jsx'
import Summary from './components/Summary.jsx'

const BATCH_SIZE = 10

export default function App() {
  // SECTIONS is a fixed, static list, so calling the hook once per entry here is safe.
  const progressBySection = SECTIONS.map((s) => useProgress(s.questions, s.id))

  const [screen, setScreen] = useState('sections') // 'sections' | 'home' | 'practice' | 'summary'
  const [activeIndex, setActiveIndex] = useState(0)
  const [batch, setBatch] = useState([])
  const [results, setResults] = useState([])

  const section = SECTIONS[activeIndex]
  const progress = progressBySection[activeIndex]

  function openSection(sectionId) {
    setActiveIndex(SECTIONS.findIndex((s) => s.id === sectionId))
    setScreen('home')
  }

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
      {screen === 'sections' && (
        <SectionSelect
          sections={SECTIONS.map((config, i) => ({
            config,
            solvedCount: progressBySection[i].solvedCount,
            totalQuestions: progressBySection[i].totalQuestions,
          }))}
          onSelect={openSection}
        />
      )}

      {screen === 'home' && (
        <Home
          title={section.title}
          icon={section.icon}
          blurb={section.blurb}
          solvedCount={progress.solvedCount}
          totalQuestions={progress.totalQuestions}
          streak={progress.streak}
          avgTimeSec={progress.avgTimeSec}
          onStart={beginPractice}
          onBack={() => setScreen('sections')}
        />
      )}

      {screen === 'practice' && (
        <Practice
          key={batch.map((q) => q.id).join('-')}
          batch={batch}
          QuestionComponent={section.QuestionComponent}
          onComplete={finishPractice}
        />
      )}

      {screen === 'summary' && (
        <Summary
          section={section}
          batch={batch}
          results={results}
          onHome={() => setScreen('home')}
          onAgain={beginPractice}
        />
      )}
    </MobileShell>
  )
}
