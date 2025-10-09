export default function AddButton() {
  return (
    <button className="w-[52px] h-[52px] bg-foreground rounded-full flex items-center justify-center text-white shadow-md">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </button>
  )
}