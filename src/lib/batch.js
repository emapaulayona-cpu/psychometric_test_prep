// Pure helpers for building a practice batch and computing the daily streak.

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Pick up to `size` unsolved questions. When none are left, the pool is exhausted:
// signal a reset and draw a fresh batch from the whole bank.
export function buildBatch(all, solvedIds, size = 10) {
  const solved = new Set(solvedIds)
  const unsolved = all.filter((q) => !solved.has(q.id))

  if (unsolved.length === 0) {
    return { batch: shuffle(all).slice(0, size), didReset: true }
  }
  return { batch: shuffle(unsolved).slice(0, size), didReset: false }
}

export function todayStr(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function daysBetween(fromStr, toStr) {
  const a = new Date(`${fromStr}T00:00:00`)
  const b = new Date(`${toStr}T00:00:00`)
  return Math.round((b - a) / 86400000)
}

// today == last → unchanged (but never below 1); +1 day → increment; gap/none → reset to 1.
export function nextStreak(lastDate, currentStreak, today = todayStr()) {
  if (!lastDate) return 1
  const gap = daysBetween(lastDate, today)
  if (gap === 0) return Math.max(currentStreak, 1)
  if (gap === 1) return currentStreak + 1
  return 1
}
