const DataFlowAnimation = () => {
  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ willChange: 'transform', contain: 'layout style paint' }}
    >
      {/* Desktop/Tablet version */}
      <svg
        className="hidden md:block w-full h-full opacity-60"
        viewBox="0 0 1400 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Circuit board grid pattern */}
          <pattern id="circuitGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(218 100% 60% / 0.08)" strokeWidth="0.5" />
          </pattern>
          
          {/* Line gradients */}
          <linearGradient id="pathGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(218 100% 60% / 0.6)" />
            <stop offset="100%" stopColor="hsl(160 100% 45% / 0.6)" />
          </linearGradient>
          
          {/* Pulse glow */}
          <filter id="pulseGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Node glow */}
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background grid */}
        <rect width="100%" height="100%" fill="url(#circuitGrid)" />

        {/* ===== CHANNEL INPUTS (Left side) ===== */}
        
        {/* Meta Ads Node */}
        <g transform="translate(80, 150)">
          <rect x="-35" y="-12" width="70" height="24" rx="2" fill="hsl(220 20% 10%)" stroke="hsl(218 100% 60% / 0.5)" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" className="fill-primary text-[9px] font-mono">META ADS</text>
          <circle cx="35" cy="0" r="3" fill="hsl(218 100% 60%)" filter="url(#nodeGlow)" />
        </g>

        {/* Google Ads Node */}
        <g transform="translate(80, 250)">
          <rect x="-35" y="-12" width="70" height="24" rx="2" fill="hsl(220 20% 10%)" stroke="hsl(218 100% 60% / 0.5)" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" className="fill-primary text-[9px] font-mono">GOOGLE ADS</text>
          <circle cx="35" cy="0" r="3" fill="hsl(218 100% 60%)" filter="url(#nodeGlow)" />
        </g>

        {/* YouTube Ads Node */}
        <g transform="translate(80, 350)">
          <rect x="-35" y="-12" width="70" height="24" rx="2" fill="hsl(220 20% 10%)" stroke="hsl(218 100% 60% / 0.5)" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" className="fill-primary text-[9px] font-mono">YOUTUBE</text>
          <circle cx="35" cy="0" r="3" fill="hsl(218 100% 60%)" filter="url(#nodeGlow)" />
        </g>

        {/* SEO Node */}
        <g transform="translate(80, 450)">
          <rect x="-35" y="-12" width="70" height="24" rx="2" fill="hsl(220 20% 10%)" stroke="hsl(218 100% 60% / 0.5)" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" className="fill-primary text-[9px] font-mono">SEO</text>
          <circle cx="35" cy="0" r="3" fill="hsl(218 100% 60%)" filter="url(#nodeGlow)" />
        </g>

        {/* LSA Node */}
        <g transform="translate(80, 550)">
          <rect x="-35" y="-12" width="70" height="24" rx="2" fill="hsl(220 20% 10%)" stroke="hsl(218 100% 60% / 0.5)" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" className="fill-primary text-[9px] font-mono">LSA</text>
          <circle cx="35" cy="0" r="3" fill="hsl(218 100% 60%)" filter="url(#nodeGlow)" />
        </g>

        {/* ===== CENTRAL HUB ===== */}
        <g transform="translate(300, 350)">
          <rect x="-50" y="-20" width="100" height="40" rx="3" fill="hsl(220 20% 8%)" stroke="hsl(218 100% 60% / 0.7)" strokeWidth="1.5" />
          <text x="0" y="-4" textAnchor="middle" className="fill-primary text-[10px] font-mono font-bold">KURIOS</text>
          <text x="0" y="10" textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">INTAKE ENGINE</text>
          <circle cx="-50" cy="0" r="4" fill="hsl(218 100% 60%)" filter="url(#nodeGlow)" />
          <circle cx="50" cy="-10" r="3" fill="hsl(218 100% 60%)" filter="url(#nodeGlow)" />
          <circle cx="50" cy="10" r="3" fill="hsl(218 100% 60%)" filter="url(#nodeGlow)" />
        </g>

        {/* ===== PROCESSING NODES (Middle) ===== */}

        {/* PI Sales Team Node */}
        <g transform="translate(550, 200)">
          <rect x="-45" y="-15" width="90" height="30" rx="2" fill="hsl(220 20% 10%)" stroke="hsl(218 100% 60% / 0.6)" strokeWidth="1" />
          <text x="0" y="-2" textAnchor="middle" className="fill-primary text-[9px] font-mono">PI SALES TEAM</text>
          <text x="0" y="9" textAnchor="middle" className="fill-muted-foreground text-[7px] font-mono">LIVE TRANSFER</text>
          <circle cx="-45" cy="0" r="3" fill="hsl(218 100% 60%)" filter="url(#nodeGlow)" />
          <circle cx="45" cy="0" r="3" fill="hsl(218 100% 60%)" filter="url(#nodeGlow)" />
        </g>

        {/* Closing Team Node */}
        <g transform="translate(750, 300)">
          <rect x="-45" y="-15" width="90" height="30" rx="2" fill="hsl(220 20% 10%)" stroke="hsl(160 100% 45% / 0.6)" strokeWidth="1" />
          <text x="0" y="-2" textAnchor="middle" className="fill-accent text-[9px] font-mono">CLOSING TEAM</text>
          <text x="0" y="9" textAnchor="middle" className="fill-muted-foreground text-[7px] font-mono">RETAINER SIGN</text>
          <circle cx="-45" cy="0" r="3" fill="hsl(160 100% 45%)" filter="url(#nodeGlow)" />
          <circle cx="45" cy="0" r="3" fill="hsl(160 100% 45%)" filter="url(#nodeGlow)" />
        </g>

        {/* Contact Details Node */}
        <g transform="translate(550, 500)">
          <rect x="-45" y="-15" width="90" height="30" rx="2" fill="hsl(220 20% 10%)" stroke="hsl(218 100% 60% / 0.5)" strokeWidth="1" />
          <text x="0" y="-2" textAnchor="middle" className="fill-primary text-[9px] font-mono">CONTACT DATA</text>
          <text x="0" y="9" textAnchor="middle" className="fill-muted-foreground text-[7px] font-mono">VERIFIED LEAD</text>
          <circle cx="-45" cy="0" r="3" fill="hsl(218 100% 60%)" filter="url(#nodeGlow)" />
          <circle cx="45" cy="0" r="3" fill="hsl(218 100% 60%)" filter="url(#nodeGlow)" />
        </g>

        {/* ===== CLIENT ENDPOINTS (Right side) ===== */}

        {/* Client Direct */}
        <g transform="translate(950, 150)">
          <rect x="-55" y="-15" width="110" height="30" rx="3" fill="hsl(160 100% 25% / 0.3)" stroke="hsl(160 100% 45% / 0.8)" strokeWidth="1.5" />
          <text x="0" y="-2" textAnchor="middle" className="fill-accent text-[9px] font-mono font-bold">YOUR FIRM</text>
          <text x="0" y="9" textAnchor="middle" className="fill-muted-foreground text-[7px] font-mono">DIRECT TRANSFER</text>
          <circle cx="-55" cy="0" r="4" fill="hsl(160 100% 45%)" filter="url(#nodeGlow)" />
        </g>

        {/* Client via Sales */}
        <g transform="translate(950, 300)">
          <rect x="-55" y="-15" width="110" height="30" rx="3" fill="hsl(160 100% 25% / 0.3)" stroke="hsl(160 100% 45% / 0.8)" strokeWidth="1.5" />
          <text x="0" y="-2" textAnchor="middle" className="fill-accent text-[9px] font-mono font-bold">YOUR FIRM</text>
          <text x="0" y="9" textAnchor="middle" className="fill-muted-foreground text-[7px] font-mono">SIGNED CASE</text>
          <circle cx="-55" cy="0" r="4" fill="hsl(160 100% 45%)" filter="url(#nodeGlow)" />
        </g>

        {/* Client Intake Team */}
        <g transform="translate(950, 500)">
          <rect x="-55" y="-15" width="110" height="30" rx="3" fill="hsl(160 100% 25% / 0.3)" stroke="hsl(160 100% 45% / 0.8)" strokeWidth="1.5" />
          <text x="0" y="-2" textAnchor="middle" className="fill-accent text-[9px] font-mono font-bold">YOUR INTAKE</text>
          <text x="0" y="9" textAnchor="middle" className="fill-muted-foreground text-[7px] font-mono">LEAD DETAILS</text>
          <circle cx="-55" cy="0" r="4" fill="hsl(160 100% 45%)" filter="url(#nodeGlow)" />
        </g>

        {/* ===== CIRCUIT PATHS ===== */}
        <g fill="none" strokeWidth="1.5" strokeLinecap="round">
          
          {/* Channel inputs to Hub */}
          <path id="path1" d="M 115 150 L 200 150 L 200 340 L 250 340" stroke="hsl(218 100% 60% / 0.3)" />
          <path id="path2" d="M 115 250 L 180 250 L 180 345 L 250 345" stroke="hsl(218 100% 60% / 0.3)" />
          <path id="path3" d="M 115 350 L 250 350" stroke="hsl(218 100% 60% / 0.3)" />
          <path id="path4" d="M 115 450 L 180 450 L 180 355 L 250 355" stroke="hsl(218 100% 60% / 0.3)" />
          <path id="path5" d="M 115 550 L 200 550 L 200 360 L 250 360" stroke="hsl(218 100% 60% / 0.3)" />

          {/* Hub to PI Sales Team (path A) */}
          <path id="pathA" d="M 350 340 L 420 340 L 420 200 L 505 200" stroke="hsl(218 100% 60% / 0.35)" />
          
          {/* Hub to Contact Details (path B) */}
          <path id="pathB" d="M 350 360 L 420 360 L 420 500 L 505 500" stroke="hsl(218 100% 60% / 0.35)" />

          {/* PI Sales to Direct Client (path C) */}
          <path id="pathC" d="M 595 200 L 700 200 L 700 150 L 895 150" stroke="hsl(218 100% 60% / 0.35)" />

          {/* PI Sales to Closing (path D) */}
          <path id="pathD" d="M 595 200 L 650 200 L 650 300 L 705 300" stroke="hsl(218 100% 60% / 0.35)" />

          {/* Closing to Client Signed (path E) */}
          <path id="pathE" d="M 795 300 L 895 300" stroke="hsl(160 100% 45% / 0.4)" />

          {/* Contact Details to Client Intake (path F) */}
          <path id="pathF" d="M 595 500 L 895 500" stroke="hsl(218 100% 60% / 0.35)" />

        </g>

        {/* ===== ANIMATED PULSES (Reduced for performance) ===== */}
        <g>
          {/* Input pulses - reduced count */}
          <circle r="4" fill="hsl(218 100% 70%)" filter="url(#pulseGlow)">
            <animateMotion dur="3s" repeatCount="indefinite" begin="0s">
              <mpath href="#path1" />
            </animateMotion>
          </circle>
          <circle r="4" fill="hsl(218 100% 70%)" filter="url(#pulseGlow)">
            <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s">
              <mpath href="#path3" />
            </animateMotion>
          </circle>
          <circle r="3" fill="hsl(218 100% 70%)" filter="url(#pulseGlow)">
            <animateMotion dur="3s" repeatCount="indefinite" begin="0.2s">
              <mpath href="#path5" />
            </animateMotion>
          </circle>

          {/* Hub to processing pulses */}
          <circle r="4" fill="hsl(218 100% 70%)" filter="url(#pulseGlow)">
            <animateMotion dur="2.5s" repeatCount="indefinite" begin="0s">
              <mpath href="#pathA" />
            </animateMotion>
          </circle>
          <circle r="4" fill="hsl(218 100% 70%)" filter="url(#pulseGlow)">
            <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.4s">
              <mpath href="#pathB" />
            </animateMotion>
          </circle>

          {/* Processing to client pulses */}
          <circle r="4" fill="hsl(218 100% 70%)" filter="url(#pulseGlow)">
            <animateMotion dur="2s" repeatCount="indefinite" begin="0s">
              <mpath href="#pathC" />
            </animateMotion>
          </circle>
          <circle r="4" fill="hsl(218 100% 70%)" filter="url(#pulseGlow)">
            <animateMotion dur="2s" repeatCount="indefinite" begin="0.2s">
              <mpath href="#pathD" />
            </animateMotion>
          </circle>
          <circle r="5" fill="hsl(160 100% 55%)" filter="url(#pulseGlow)">
            <animateMotion dur="1.5s" repeatCount="indefinite" begin="0s">
              <mpath href="#pathE" />
            </animateMotion>
          </circle>
          <circle r="4" fill="hsl(218 100% 70%)" filter="url(#pulseGlow)">
            <animateMotion dur="2s" repeatCount="indefinite" begin="0.3s">
              <mpath href="#pathF" />
            </animateMotion>
          </circle>
        </g>

        {/* Corner accent marks */}
        <g stroke="hsl(218 100% 60% / 0.3)" strokeWidth="1" fill="none">
          <path d="M 20 20 L 20 50 M 20 20 L 50 20" />
          <path d="M 1380 20 L 1380 50 M 1380 20 L 1350 20" />
          <path d="M 20 680 L 20 650 M 20 680 L 50 680" />
          <path d="M 1380 680 L 1380 650 M 1380 680 L 1350 680" />
        </g>

      </svg>

      {/* Mobile version */}
      <svg
        className="block md:hidden w-full h-full opacity-50"
        viewBox="0 0 400 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="circuitGridMobile" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="hsl(218 100% 60% / 0.08)" strokeWidth="0.5" />
          </pattern>
          <filter id="pulseGlowMobile">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background grid */}
        <rect width="100%" height="100%" fill="url(#circuitGridMobile)" />

        {/* ===== MOBILE LAYOUT - Vertical flow ===== */}

        {/* Channel inputs row */}
        <g transform="translate(200, 80)">
          <rect x="-30" y="-10" width="60" height="20" rx="2" fill="hsl(220 20% 10%)" stroke="hsl(218 100% 60% / 0.5)" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" className="fill-primary text-[8px] font-mono">CHANNELS</text>
        </g>
        
        {/* Small channel indicators */}
        <g className="fill-primary text-[6px] font-mono">
          <text x="60" y="120" textAnchor="middle" className="fill-muted-foreground">META</text>
          <text x="130" y="120" textAnchor="middle" className="fill-muted-foreground">GOOGLE</text>
          <text x="200" y="120" textAnchor="middle" className="fill-muted-foreground">YT</text>
          <text x="270" y="120" textAnchor="middle" className="fill-muted-foreground">SEO</text>
          <text x="340" y="120" textAnchor="middle" className="fill-muted-foreground">LSA</text>
        </g>

        {/* Channel dots */}
        <circle cx="60" cy="130" r="4" fill="hsl(218 100% 60%)" />
        <circle cx="130" cy="130" r="4" fill="hsl(218 100% 60%)" />
        <circle cx="200" cy="130" r="4" fill="hsl(218 100% 60%)" />
        <circle cx="270" cy="130" r="4" fill="hsl(218 100% 60%)" />
        <circle cx="340" cy="130" r="4" fill="hsl(218 100% 60%)" />

        {/* Hub */}
        <g transform="translate(200, 250)">
          <rect x="-45" y="-18" width="90" height="36" rx="3" fill="hsl(220 20% 8%)" stroke="hsl(218 100% 60% / 0.7)" strokeWidth="1.5" />
          <text x="0" y="-3" textAnchor="middle" className="fill-primary text-[9px] font-mono font-bold">KURIOS</text>
          <text x="0" y="10" textAnchor="middle" className="fill-muted-foreground text-[7px] font-mono">ENGINE</text>
        </g>

        {/* Processing nodes */}
        <g transform="translate(100, 400)">
          <rect x="-40" y="-12" width="80" height="24" rx="2" fill="hsl(220 20% 10%)" stroke="hsl(218 100% 60% / 0.5)" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" className="fill-primary text-[8px] font-mono">SALES TEAM</text>
        </g>

        <g transform="translate(300, 400)">
          <rect x="-40" y="-12" width="80" height="24" rx="2" fill="hsl(220 20% 10%)" stroke="hsl(218 100% 60% / 0.5)" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" className="fill-primary text-[8px] font-mono">CONTACT DATA</text>
        </g>

        <g transform="translate(200, 550)">
          <rect x="-40" y="-12" width="80" height="24" rx="2" fill="hsl(220 20% 10%)" stroke="hsl(160 100% 45% / 0.6)" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" className="fill-accent text-[8px] font-mono">CLOSING</text>
        </g>

        {/* Client endpoints */}
        <g transform="translate(100, 700)">
          <rect x="-45" y="-12" width="90" height="24" rx="2" fill="hsl(160 100% 25% / 0.3)" stroke="hsl(160 100% 45% / 0.8)" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" className="fill-accent text-[8px] font-mono font-bold">YOUR FIRM</text>
        </g>

        <g transform="translate(300, 700)">
          <rect x="-45" y="-12" width="90" height="24" rx="2" fill="hsl(160 100% 25% / 0.3)" stroke="hsl(160 100% 45% / 0.8)" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" className="fill-accent text-[8px] font-mono font-bold">YOUR INTAKE</text>
        </g>

        {/* Mobile paths */}
        <g fill="none" stroke="hsl(218 100% 60% / 0.3)" strokeWidth="1.5">
          {/* Channels to hub */}
          <path id="mPath1" d="M 60 134 L 60 200 L 155 232" />
          <path id="mPath2" d="M 130 134 L 130 180 L 160 232" />
          <path id="mPath3" d="M 200 134 L 200 232" />
          <path id="mPath4" d="M 270 134 L 270 180 L 240 232" />
          <path id="mPath5" d="M 340 134 L 340 200 L 245 232" />
          
          {/* Hub to processing */}
          <path id="mPathA" d="M 170 268 L 100 320 L 100 388" />
          <path id="mPathB" d="M 230 268 L 300 320 L 300 388" />
          
          {/* Processing to closing/client */}
          <path id="mPathC" d="M 100 412 L 100 480 L 160 538" />
          <path id="mPathD" d="M 100 412 L 100 688" stroke="hsl(160 100% 45% / 0.3)" />
          <path id="mPathE" d="M 200 562 L 200 630 L 100 688" stroke="hsl(160 100% 45% / 0.3)" />
          <path id="mPathF" d="M 300 412 L 300 688" />
        </g>

        {/* Mobile animated pulses (reduced for performance) */}
        <g>
          <circle r="4" fill="hsl(218 100% 70%)" filter="url(#pulseGlowMobile)">
            <animateMotion dur="2s" repeatCount="indefinite" begin="0s">
              <mpath href="#mPath1" />
            </animateMotion>
          </circle>
          <circle r="4" fill="hsl(218 100% 70%)" filter="url(#pulseGlowMobile)">
            <animateMotion dur="1.5s" repeatCount="indefinite" begin="0.2s">
              <mpath href="#mPath3" />
            </animateMotion>
          </circle>
          <circle r="4" fill="hsl(218 100% 70%)" filter="url(#pulseGlowMobile)">
            <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s">
              <mpath href="#mPath5" />
            </animateMotion>
          </circle>
          <circle r="4" fill="hsl(218 100% 70%)" filter="url(#pulseGlowMobile)">
            <animateMotion dur="2s" repeatCount="indefinite" begin="0s">
              <mpath href="#mPathA" />
            </animateMotion>
          </circle>
          <circle r="4" fill="hsl(218 100% 70%)" filter="url(#pulseGlowMobile)">
            <animateMotion dur="2s" repeatCount="indefinite" begin="0.3s">
              <mpath href="#mPathB" />
            </animateMotion>
          </circle>
          <circle r="5" fill="hsl(160 100% 55%)" filter="url(#pulseGlowMobile)">
            <animateMotion dur="2.5s" repeatCount="indefinite" begin="0s">
              <mpath href="#mPathD" />
            </animateMotion>
          </circle>
          <circle r="4" fill="hsl(218 100% 70%)" filter="url(#pulseGlowMobile)">
            <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s">
              <mpath href="#mPathF" />
            </animateMotion>
          </circle>
        </g>

        {/* Corner marks */}
        <g stroke="hsl(218 100% 60% / 0.3)" strokeWidth="1" fill="none">
          <path d="M 15 15 L 15 40 M 15 15 L 40 15" />
          <path d="M 385 15 L 385 40 M 385 15 L 360 15" />
        </g>
      </svg>
    </div>
  );
};

export default DataFlowAnimation;