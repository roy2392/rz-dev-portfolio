import { useState, useEffect, useRef } from 'react'

const COMMANDS = [
  { cmd: '$ whoami', output: 'Roey Zalta — ML Engineer & AI Architect' },
  { cmd: '$ cat focus.txt', output: 'Multi-Agent Systems · LLMOps · RAG · Prompt Engineering' },
  { cmd: '$ ls cloud/', output: 'aws-bedrock/  azure-ai/  sagemaker/  lambda/  docker/' },
  { cmd: '$ git log --oneline -5', output: `a3f2e1d Ship multi-agent orchestrator v2\nb7c4d8a Deploy RAG pipeline on Bedrock\nc1e5f3b Add MCP server security layer\nd9a2b6c Production LLMOps pipeline\ne4f7c0d CrewAI agent self-improvement` },
  { cmd: '$ echo $GITHUB_REPOS', output: '115+ repositories · Python, JavaScript, TypeScript' },
  { cmd: '$ curl -s api/status', output: '{"status":"available","response_time":"<24h","coffee_level":"high"}' },
]

export const TerminalWindow = () => {
  const [lines, setLines] = useState([])
  const [currentCmd, setCurrentCmd] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [phase, setPhase] = useState('typing') // 'typing' | 'output' | 'done'
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  useEffect(() => {
    if (currentCmd >= COMMANDS.length) return

    const { cmd, output } = COMMANDS[currentCmd]

    if (phase === 'typing') {
      if (charIndex < cmd.length) {
        const timer = setTimeout(() => {
          setLines(prev => {
            const next = [...prev]
            if (next.length === 0 || next[next.length - 1].type !== 'cmd' || next[next.length - 1].done) {
              next.push({ type: 'cmd', text: cmd.slice(0, charIndex + 1), done: false })
            } else {
              next[next.length - 1] = { type: 'cmd', text: cmd.slice(0, charIndex + 1), done: false }
            }
            return next
          })
          setCharIndex(charIndex + 1)
        }, 30 + Math.random() * 40)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setLines(prev => {
            const next = [...prev]
            next[next.length - 1] = { ...next[next.length - 1], done: true }
            return next
          })
          setPhase('output')
        }, 200)
        return () => clearTimeout(timer)
      }
    }

    if (phase === 'output') {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, { type: 'output', text: output }])
        setPhase('typing')
        setCharIndex(0)
        setCurrentCmd(currentCmd + 1)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [currentCmd, charIndex, phase])

  return (
    <div className="h-full bg-[#1a1a2e] font-mono text-sm p-4 overflow-y-auto">
      <div className="text-green-400/60 mb-3">
        Last login: {new Date().toDateString()} on ttys001
      </div>
      {lines.map((line, i) => (
        <div key={i} className={`${line.type === 'cmd' ? 'text-green-400' : 'text-gray-300'} whitespace-pre-wrap mb-1`}>
          {line.text}
          {line.type === 'cmd' && !line.done && (
            <span className="inline-block w-2 h-4 bg-green-400 ml-0.5 animate-pulse" />
          )}
        </div>
      ))}
      {currentCmd >= COMMANDS.length && (
        <div className="text-green-400 mt-1">
          $ <span className="inline-block w-2 h-4 bg-green-400 ml-0.5 animate-pulse" />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
