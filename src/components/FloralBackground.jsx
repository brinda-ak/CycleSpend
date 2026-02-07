/**
 * Floral line-art background — appears behind all pages (login, signup, main app).
 */
export default function FloralBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 bg-[#F5EDE8]"
      style={{
        backgroundImage: 'url(/assets/floral-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  )
}
