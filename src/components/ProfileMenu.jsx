import { useState, useRef, useEffect } from 'react'
import { User, LogOut } from 'lucide-react'
import { getCurrentUser, signOut } from '../lib/auth'

export default function ProfileMenu({ profile, onProfileRefresh }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  const user = getCurrentUser()
  const name = profile?.name || user?.displayName || 'User'
  const email = user?.email || ''
  const photoURL = user?.photoURL

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [open])

  const handleSignOut = async () => {
    await signOut()
    setOpen(false)
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-burgundy/80 transition-colors"
        aria-label="Profile"
      >
        {photoURL ? (
          <img src={photoURL} alt="" className="w-8 h-8 rounded-full border-2 border-tan/50 object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-tan/30 flex items-center justify-center">
            <User size={18} className="text-tan" />
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-tan shadow-card border border-dark-tan/30 py-3 z-50 overflow-hidden">
          <div className="px-4 pb-3 border-b border-dark-tan/30">
            <div className="flex items-center gap-3">
              {photoURL ? (
                <img src={photoURL} alt="" className="w-12 h-12 rounded-full border-2 border-mauve/30 object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-mauve/30 flex items-center justify-center">
                  <User size={24} className="text-burgundy" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-burgundy truncate">{name}</p>
                {email && <p className="text-xs text-espresso/70 truncate font-sans">{email}</p>}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 space-y-2 font-sans text-sm">
            {profile?.lastPeriodStart && (
              <p className="text-espresso/80">Cycle: {profile.cycleLength || 28} days</p>
            )}
            {profile?.monthlyBudget != null && (
              <p className="text-espresso/80">Budget: ${profile.monthlyBudget}/mo</p>
            )}
          </div>
          <div className="px-2 pt-2 border-t border-dark-tan/30 space-y-1">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-cranberry hover:bg-cranberry/10 font-sans font-medium"
            >
              <LogOut size={18} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
