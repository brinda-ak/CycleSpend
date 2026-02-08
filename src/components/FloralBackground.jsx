/**
 * Warm background — appears behind all pages. Clean gradient; garden is where flower magic happens.
 */
export default function FloralBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0"
      style={{
        background: 'linear-gradient(180deg, #F5EDE8 0%, #EDE4DD 50%, #E5DBD3 100%)',
      }}
    />
  )
}
