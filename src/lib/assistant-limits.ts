// Bounds paid generation on this server process without trusting client-supplied IP headers.
// A shared store is needed when deploying multiple independent instances.
export function createGenerationBudget(limit = 12, windowMs = 60_000) {
  let startedAt = 0
  let used = 0
  return (now = Date.now()) => {
    if (now >= startedAt + windowMs) { startedAt = now; used = 0 }
    const retryAfter = Math.max(1, Math.ceil((startedAt + windowMs - now) / 1000))
    if (used >= limit) return { allowed: false, retryAfter }
    used++
    return { allowed: true, retryAfter }
  }
}
