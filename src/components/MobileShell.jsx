export default function MobileShell({ children }) {
  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="relative w-full max-w-md min-h-screen bg-white/40 backdrop-blur-[2px] shadow-[0_0_60px_-15px_rgba(16,42,27,0.15)] flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  )
}
