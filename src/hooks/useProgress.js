import { useCallback, useState } from 'react'
import { buildBatch, nextStreak, todayStr } from '../lib/batch.js'

const KEYS = {
  solved: 'solved_question_ids',
  lastDate: 'last_practice_date',
  streak: 'current_streak',
  totalTime: 'total_time_spent',
  totalAnswered: 'total_questions_answered',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function snapshot() {
  return {
    solvedIds: read(KEYS.solved, []),
    lastDate: read(KEYS.lastDate, null),
    streak: read(KEYS.streak, 0),
    totalTime: read(KEYS.totalTime, 0), // seconds
    totalAnswered: read(KEYS.totalAnswered, 0),
  }
}

export function useProgress(allQuestions) {
  const [state, setState] = useState(snapshot)

  const totalQuestions = allQuestions.length
  const solvedCount = state.solvedIds.length
  const avgTimeSec =
    state.totalAnswered > 0 ? state.totalTime / state.totalAnswered : 0

  // Build a batch; if the bank was exhausted, clear the solved pool so it starts fresh.
  const startBatch = useCallback(
    (size = 10) => {
      const { solvedIds } = snapshot()
      const { batch, didReset } = buildBatch(allQuestions, solvedIds, size)
      if (didReset) {
        write(KEYS.solved, [])
        setState((s) => ({ ...s, solvedIds: [] }))
      }
      return batch
    },
    [allQuestions],
  )

  // Persist the outcome of a finished batch. results: [{ id, correct, timeMs }]
  const commitBatch = useCallback((results) => {
    const cur = snapshot()
    const solvedIds = Array.from(
      new Set([...cur.solvedIds, ...results.map((r) => r.id)]),
    )
    const addedSeconds = Math.round(
      results.reduce((sum, r) => sum + r.timeMs, 0) / 1000,
    )
    const totalTime = cur.totalTime + addedSeconds
    const totalAnswered = cur.totalAnswered + results.length
    const today = todayStr()
    const streak = nextStreak(cur.lastDate, cur.streak, today)

    write(KEYS.solved, solvedIds)
    write(KEYS.totalTime, totalTime)
    write(KEYS.totalAnswered, totalAnswered)
    write(KEYS.streak, streak)
    write(KEYS.lastDate, today)

    setState({ solvedIds, totalTime, totalAnswered, streak, lastDate: today })
  }, [])

  const resetAll = useCallback(() => {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k))
    setState(snapshot())
  }, [])

  return {
    totalQuestions,
    solvedCount,
    streak: state.streak,
    totalAnswered: state.totalAnswered,
    avgTimeSec,
    startBatch,
    commitBatch,
    resetAll,
  }
}
