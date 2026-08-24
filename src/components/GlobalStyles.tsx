/* =========================================================================
   THEME — "Live API" portfolio for a .NET backend engineer
   Palette (syntax-highlighting logic):
     void    #070B14  page base          panel  #0D1420  cards
     line    #1E2A3D  borders            raised #141E2E  elevated
     purple  #7C5CFF  keywords / actions (.NET brand family)
     amber   #F5B759  strings / highlights
     green   #3DDC97  status 200 / success
     text    #E6EBF4  primary            muted  #8B98AD
   Type: Space Grotesk (display) · Inter (body) · JetBrains Mono (code)
   ========================================================================= */

const GlobalStyles: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

    :root {
      --void:   #070B14;
      --panel:  #0D1420;
      --raised: #141E2E;
      --line:   #1E2A3D;
      --purple: #7C5CFF;
      --purple-deep: #512BD4;
      --amber:  #F5B759;
      --green:  #3DDC97;
      --text:   #E6EBF4;
      --muted:  #8B98AD;
    }

    html { scroll-behavior: smooth; }

    body, .font-body { font-family: 'Inter', system-ui, sans-serif; }
    .font-display    { font-family: 'Space Grotesk', system-ui, sans-serif; }
    .font-mono       { font-family: 'JetBrains Mono', ui-monospace, monospace; }

    .bg-void   { background-color: var(--void); }
    .bg-panel  { background-color: var(--panel); }
    .bg-raised { background-color: var(--raised); }
    .border-line { border-color: var(--line); }

    .text-main   { color: var(--text); }
    .text-muted  { color: var(--muted); }
    .text-purple { color: var(--purple); }
    .text-amber  { color: var(--amber); }
    .text-green  { color: var(--green); }

    /* subtle grid backdrop — engineering paper */
    .grid-bg {
      background-image:
        linear-gradient(rgba(124, 92, 255, 0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(124, 92, 255, 0.045) 1px, transparent 1px);
      background-size: 44px 44px;
    }

    .glow-purple { box-shadow: 0 0 0 1px rgba(124,92,255,.35), 0 0 42px rgba(124,92,255,.16); }
    .card-hover  { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
    .card-hover:hover {
      transform: translateY(-4px);
      border-color: rgba(124,92,255,.55);
      box-shadow: 0 12px 40px rgba(0,0,0,.45), 0 0 24px rgba(124,92,255,.10);
    }

    @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
    .cursor-block {
      display: inline-block; width: .6em; height: 1.1em;
      background: var(--amber); vertical-align: text-bottom;
      margin-left: 2px; animation: blink 1s step-end infinite;
    }

    @keyframes modalBackdropFade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes modalPopIn {
      from { opacity: 0; transform: scale(0.94) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .animate-backdrop {
      animation: modalBackdropFade 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .animate-modal-card {
      animation: modalPopIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
    .fade-up   { animation: fadeUp .7s ease both; }
    .fade-up-1 { animation: fadeUp .7s ease .12s both; }
    .fade-up-2 { animation: fadeUp .7s ease .24s both; }

    @media (prefers-reduced-motion: reduce) {
      .fade-up, .fade-up-1, .fade-up-2 { animation: none; }
      .cursor-block { animation: none; }
      .animate-backdrop, .animate-modal-card { animation: none; }
      html { scroll-behavior: auto; }
    }

    ::selection { background: rgba(124,92,255,.4); }

    /* thin scrollbars for code panes */
    .scroll-thin::-webkit-scrollbar { height: 6px; width: 6px; }
    .scroll-thin::-webkit-scrollbar-thumb { background: var(--line); border-radius: 3px; }
  `}</style>
);

export default GlobalStyles;
