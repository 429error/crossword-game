import { useState, useEffect, useRef } from 'react'
import './App.css'

const SUBJECTS = {
  'Science': [
    'ATOM', 'MOLECULE', 'CELL', 'DNA', 'ENERGY', 'FORCE', 'GRAVITY', 'LIGHT', 'SOUND', 'WAVE',
    'MATTER', 'ELEMENT', 'REACTION', 'BOND', 'OXIDE', 'ACID', 'BASE', 'SALTS', 'ISOTOPE', 'NEUTRON',
    'ELECTRON', 'PROTON', 'QUARK', 'PHYSICS', 'BIOLOGY', 'CHEMISTRY', 'BOTANY', 'ZOOLOGY', 'ECOSYSTEM', 'HABITAT',
    'SPECIES', 'GENETICS', 'EVOLUTION', 'PHOTOSYNTHESIS', 'RESPIRATION', 'METABOLISM', 'OSMOSIS', 'DIFFUSION', 'CATALYST', 'SOLVENT',
    'PRECIPITATE', 'FILTRATION', 'DISTILLATION', 'CHROMATOGRAPHY', 'SPECTRUM', 'FREQUENCY', 'AMPLITUDE', 'VELOCITY', 'ACCELERATION', 'MOMENTUM',
    'DENSITY', 'PRESSURE', 'VOLUME', 'TEMPERATURE', 'THERMAL', 'CONDUCTOR', 'INSULATOR', 'MAGNET', 'INDUCTION', 'CURRENT',
    'VOLTAGE', 'RESISTANCE', 'CIRCUIT', 'BATTERY', 'POLARITY', 'IONIC', 'COVALENT', 'METALLIC', 'HYDROGEN', 'OXYGEN',
    'CARBON', 'NITROGEN', 'SULFUR', 'PHOSPHORUS', 'POTASSIUM', 'CALCIUM', 'SODIUM', 'CHLORINE', 'SILICON', 'IRON',
    'COPPER', 'ZINC', 'MERCURY', 'LEAD', 'GOLD', 'SILVER', 'ALUMINUM', 'MAGNESIUM', 'TUNGSTEN', 'PLATINUM',
    'RADON', 'URANIUM', 'RADIUM', 'POLONIUM', 'TECHNETIUM', 'PROMETHIUM', 'NEPTUNIUM', 'PLUTONIUM', 'AMERICIUM', 'CURIUM'
  ],
  'Physics': [
    'MOTION', 'VELOCITY', 'ACCELERATION', 'MOMENTUM', 'FRICTION', 'PRESSURE', 'DENSITY', 'VOLTAGE', 'CURRENT', 'RESISTANCE',
    'MAGNET', 'FIELD', 'REFLECTION', 'REFRACTION', 'SPECTRUM', 'FREQUENCY', 'AMPLITUDE', 'WAVELENGTH', 'OPTICS', 'THERMAL',
    'ENERGY', 'WORK', 'POWER', 'GRAVITY', 'ORBIT', 'SATELLITE', 'PLANET', 'STAR', 'GALAXY', 'UNIVERSE',
    'NEWTON', 'EINSTEIN', 'BOHR', 'FERMI', 'HAWKING', 'GALILEO', 'KEPLER', 'COPERNICUS', 'TESLA', 'MAXWELL',
    'FORCE', 'WEIGHT', 'MASS', 'INERTIA', 'ACTION', 'REACTION', 'EQUILIBRIUM', 'TENSION', 'NORMAL', 'CENTRIPETAL',
    'CENTRIFUGAL', 'OSCILLATION', 'PENDULUM', 'RESONANCE', 'INTERFERENCE', 'DIFFRACTION', 'POLARIZATION', 'DOPPLER', 'SONIC', 'SUPERSONIC',
    'HYPERSONIC', 'TRANSVERSE', 'LONGITUDINAL', 'ELECTROMAGNETIC', 'RADIATION', 'RADAR', 'SONAR', 'LASER', 'MASER', 'PHOTON',
    'QUANTUM', 'WAVE', 'PARTICLE', 'POSITRON', 'ANTIMATTER', 'GRAVITON', 'HIGGS', 'BOSON', 'LEPTON', 'HADRON',
    'MESON', 'BARYON', 'QUARK', 'GLUON', 'PHOTON', 'GRAVITY', 'SPACETIME', 'RELATIVITY', 'DILATION', 'CONTRACTION',
    'PARADOX', 'ENTROPY', 'ENTANGLEMENT', 'SUPERPOSITION', 'TUNNELING', 'DECAY', 'FUSION', 'FISSION', 'ANNIHILATION', 'PAIR'
  ],
  'Biology': [
    'ORGAN', 'TISSUE', 'SYSTEM', 'MUSCLE', 'BONE', 'BRAIN', 'HEART', 'LIVER', 'LUNGS', 'KIDNEY',
    'STOMACH', 'NERVE', 'BLOOD', 'VIRUS', 'BACTERIA', 'FUNGUS', 'PLANT', 'LEAF', 'ROOT', 'SEED',
    'FLOWER', 'FRUIT', 'STEM', 'BARK', 'CHLOROPHYLL', 'STOMATA', 'XYLEM', 'PHLOEM', 'MERISTEM', 'CAMBIUM',
    'CIRCULATORY', 'RESPIRATORY', 'DIGESTIVE', 'NERVOUS', 'ENDOCRINE', 'IMMUNE', 'LYMPHATIC', 'SKELETAL', 'MUSCULAR', 'INTEGUMENTARY',
    'PROKARYOTE', 'EUKARYOTE', 'MITOCHONDRIA', 'RIBOSOME', 'NUCLEUS', 'CHLOROPLAST', 'VACUOLE', 'LYSOSOME', 'GOLGI', 'ER',
    'PROTEIN', 'CARBOHYDRATE', 'LIPID', 'NUCLEIC', 'AMINO', 'GLUCOSE', 'STARCH', 'CELLULOSE', 'CHITIN', 'PEPTIDE',
    'ENZYME', 'HORMONE', 'INSULIN', 'ADRENAL', 'THYROID', 'ESTROGEN', 'TESTOSTERONE', 'CORTISOL', 'EPO', 'GHR',
    'CHROMOSOME', 'GENE', 'ALLELE', 'DOMINANT', 'RECESSIVE', 'CODON', 'ANTICODON', 'TRANSCRIPTION', 'TRANSLATION', 'REPLICATION',
    'MUTATION', 'SELECTION', 'ADAPTATION', 'SPECIATION', 'EVOLUTION', 'EXTINCTION', 'FOSSIL', 'ANCESTOR', 'DESCENDANT', 'HOMOLOGY',
    'ANALOGY', 'MIMICRY', 'CAMOUFLAGE', 'PREDATOR', 'PREY', 'COMPETITION', 'SYMBIOSIS', 'PARASITISM', 'MUTUALISM', 'COMMENSALISM'
  ],
  'Chemistry': [
    'REACTION', 'SYNTHESIS', 'COMPOUND', 'SOLUTION', 'PRECIPITATE', 'CATALYST', 'ELECTRON', 'PROTON', 'NEUTRON', 'ORBITAL',
    'VALENCE', 'BONDING', 'IONIC', 'COVALENT', 'METALLIC', 'ACIDIC', 'BASIC', 'NEUTRAL', 'OXIDATION', 'REDUCTION',
    'ELECTROLYTE', 'POTENTIAL', 'EQUILIBRIUM', 'LECHATELIER', 'HESS', 'BOYLE', 'CHARLES', 'AVOGADRO', 'DALTON', 'GAYLUSSAC',
    'PERIODIC', 'TABLE', 'GROUP', 'PERIOD', 'ALKALI', 'ALKALINE', 'HALOGEN', 'NOBLE', 'TRANSITION', 'LANTHANIDE',
    'ACTINIDE', 'METALLOID', 'NONMETAL', 'METAL', 'HYDRIDE', 'OXIDE', 'SULFIDE', 'CHLORIDE', 'BROMIDE', 'FLUORIDE',
    'IODIDE', 'NITRIDE', 'CARBIDE', 'SILICATE', 'PHOSPHATE', 'SULFATE', 'CARBONATE', 'NITRATE', 'CHLORATE', 'PERCHLORATE',
    'HYDROXIDE', 'PEROXIDE', 'SUPEROXIDE', 'OZONE', 'OZONIDE', 'PEROXYACETYL', 'NITRATE', 'NITRITE', 'AMMONIA', 'AMMONIUM',
    'HYDRAZINE', 'HYDROGEN', 'OXYGEN', 'NITROGEN', 'FLUORINE', 'CHLORINE', 'BROMINE', 'IODINE', 'HELIUM', 'NEON',
    'ARGON', 'KRYPTON', 'XENON', 'RADON', 'LIQUID', 'SOLID', 'GAS', 'PLASMA', 'CONDENSATION', 'EVAPORATION',
    'MELTING', 'FREEZING', 'SUBLIMATION', 'DEPOSITION', 'IONIZATION', 'DEIONIZATION', 'DISSOCIATION', 'ASSOCIATION', 'AGGREGATION', 'SOLVOLYSIS'
  ],
  'Math': [
    'NUMBER', 'EQUATION', 'VARIABLE', 'FUNCTION', 'GRAPH', 'ANGLE', 'CIRCLE', 'TRIANGLE', 'SQUARE', 'RECTANGLE',
    'PYTHAGORAS', 'ALGEBRA', 'CALCULUS', 'DERIVATIVE', 'INTEGRAL', 'MATRIX', 'VECTOR', 'SCALAR', 'RATIO', 'PROPORTION',
    'PERCENTAGE', 'FRACTION', 'DECIMAL', 'INTEGER', 'PRIME', 'COMPOSITE', 'FACTOR', 'MULTIPLE', 'DIVISIBLE', 'SQUARE',
    'CUBE', 'ROOT', 'POWER', 'EXPONENT', 'LOGARITHM', 'ANTILOG', 'SIGMA', 'SUM', 'PRODUCT', 'QUOTIENT',
    'DIFFERENCE', 'BINOMIAL', 'TRINOMIAL', 'POLYNOMIAL', 'QUADRATIC', 'LINEAR', 'CUBIC', 'QUARTIC', 'QUINTIC', 'SEXTIC',
    'AXIOM', 'THEOREM', 'LEMMA', 'COROLLARY', 'POSTULATE', 'CONJECTURE', 'HYPOTHESIS', 'PROOF', 'INDUCTION', 'DEDUCTION',
    'PARABOLA', 'HYPERBOLA', 'ELLIPSE', 'ASYMPTOTE', 'VERTEX', 'FOCUS', 'DIRECTRIX', 'LATUS', 'RECTUM', 'ECCENTRICITY',
    'SINE', 'COSINE', 'TANGENT', 'SECANT', 'COSECANT', 'COTANGENT', 'ARC', 'INVERSE', 'HYPERBOLIC', 'TRIGONOMETRY',
    'DOMAIN', 'RANGE', 'PERIODIC', 'AMPLITUDE', 'PHASE', 'FREQUENCY', 'WAVELENGTH', 'INTERCEPT', 'SLOPE', 'GRADIENT',
    'TANGENT', 'NORMAL', 'CURVATURE', 'INFLECTION', 'CONCAVE', 'CONVEX', 'POLYGON', 'PENTAGON', 'HEXAGON', 'OCTAGON'
  ],
  'Geography': [
    'MOUNTAIN', 'RIVER', 'OCEAN', 'DESERT', 'FOREST', 'VALLEY', 'PLATEAU', 'ISLAND', 'CONTINENT', 'CLIMATE',
    'WEATHER', 'EROSION', 'VOLCANO', 'EARTHQUAKE', 'TECTONIC', 'LATITUDE', 'LONGITUDE', 'EQUATOR', 'TROPIC', 'POLAR',
    'GLACIER', 'ICE', 'SNOW', 'RAIN', 'SNOWFALL', 'WIND', 'STORM', 'HURRICANE', 'TORNADO', 'TYPHOON',
    'MONSOON', 'TSUNAMI', 'FLOOD', 'DROUGHT', 'AVALANCHE', 'LANDSLIDE', 'SEDIMENT', 'ALLUVIAL', 'DELTA', 'ESTUARY',
    'CAVE', 'CANYON', 'GORGE', 'ESCARPMENT', 'RIDGE', 'PEAK', 'SUMMIT', 'BASE', 'SLOPE', 'HILLSLOPE',
    'EQUATORIAL', 'TROPICAL', 'SUBTROPICAL', 'TEMPERATE', 'POLAR', 'ARID', 'SEMIARID', 'HUMID', 'SEMIHUMID', 'SUBHUMID',
    'MARITIME', 'CONTINENTAL', 'MIXED', 'DECIDUOUS', 'CONIFEROUS', 'TROPICAL', 'SCRUB', 'SAVANNA', 'PRAIRIE', 'TUNDRA',
    'PERMAFROST', 'BIOME', 'ECOSYSTEM', 'HABITAT', 'NICHE', 'BIODIVERSITY', 'ENDEMIC', 'MIGRATORY', 'MAMMAL', 'REPTILE',
    'AMPHIBIAN', 'AVIAN', 'PISCINE', 'CRUSTACEAN', 'MOLLUSK', 'ARTHROPOD', 'INSECT', 'ARACHNID', 'PLANKTON', 'NEKTON',
    'BENTHOS', 'DECOMPOSER', 'PRODUCER', 'CONSUMER', 'CARNIVORE', 'HERBIVORE', 'OMNIVORE', 'DETRITIVORE', 'SAPROPHYTE', 'PARASITE'
  ],
  'History': [
    'EMPIRE', 'KINGDOM', 'WAR', 'TREATY', 'REVOLUTION', 'ANCIENT', 'MEDIEVAL', 'MODERN', 'CIVILIZATION', 'DYNASTY',
    'MONARCHY', 'DEMOCRACY', 'SLAVERY', 'COLONY', 'INDEPENDENCE', 'INDUSTRY', 'RENAISSANCE', 'ENLIGHTENMENT', 'WORLDWAR', 'PEACE',
    'PHARAOH', 'CAESAR', 'NAPOLEON', 'HITLER', 'STALIN', 'CHURCHILL', 'ROOSEVELT', 'GANDHI', 'MANDELA', 'LINCOLN',
    'WASHINGTON', 'JEFFERSON', 'FRANKLIN', 'HAMILTON', 'ADAMS', 'KENNEDY', 'JOHNSON', 'NIXON', 'CARTER', 'REAGAN',
    'THATCHER', 'DEGAULLE', 'MUSSOLINI', 'FRANCO', 'LENIN', 'TROTSKY', 'MAO', 'TITO', 'SADDAM', 'KHOMEINI',
    'SUMERIAN', 'EGYPTIAN', 'GREEK', 'ROMAN', 'PERSIAN', 'CHINESE', 'INDIAN', 'MAYAN', 'AZTEC', 'INCAN',
    'VIKING', 'NORMAN', 'BYZANTINE', 'OTTOMAN', 'MONGOL', 'MUGHAL', 'BRITISH', 'FRENCH', 'SPANISH', 'PORTUGUESE',
    'DUTCH', 'BELGIAN', 'GERMAN', 'RUSSIAN', 'AMERICAN', 'CANADIAN', 'MEXICAN', 'BRAZILIAN', 'ARGENTINIAN', 'CHILEAN',
    'AUSTRALIAN', 'NEWZEALAND', 'JAPANESE', 'KOREAN', 'VIETNAMESE', 'THAI', 'INDONESIAN', 'MALAYSIAN', 'PHILIPPINE', 'SINGAPORE',
    'EGYPT', 'SUDAN', 'ETHIOPIA', 'KENYA', 'TANZANIA', 'NIGERIA', 'GHANA', 'SENEGAL', 'MOROCCO', 'ALGERIA'
  ],
  'Psychology': [
    'MIND', 'BEHAVIOR', 'MEMORY', 'EMOTION', 'PERCEPTION', 'LEARNING', 'PERSONALITY', 'INTELLIGENCE', 'ANXIETY', 'DEPRESSION',
    'THERAPY', 'COGNITION', 'NEUROSCIENCE', 'SOCIAL', 'DEVELOPMENT', 'MOTIVATION', 'ATTENTION', 'CONSCIOUS', 'UNCONSCIOUS', 'SENSORY',
    'RECEPTOR', 'NEURON', 'SYNAPSE', 'AXON', 'DENDRITE', 'MYELIN', 'GLIAL', 'CEREBRAL', 'CEREBELLUM', 'HIPPOCAMPUS',
    'AMYGDALA', 'HYPOTHALAMUS', 'THALAMUS', 'PONS', 'MEDULLA', 'SPINAL', 'REFLEX', 'ARC', 'STIMULUS', 'RESPONSE',
    'SENSATION', 'TRANSDUCTION', 'THRESHOLD', 'ADAPTATION', 'HABITUATION', 'SENSITIZATION', 'CLASSICAL', 'OPERANT', 'CONDITIONING', 'REINFORCEMENT',
    'PUNISHMENT', 'EXTINCTION', 'DISCRIMINATION', 'GENERALIZATION', 'OBSERVATIONAL', 'IMPRINTING', 'MATHEMATICAL', 'COMPUTATIONAL', 'COGNITIVE', 'BEHAVIORAL',
    'PSYCHODYNAMIC', 'HUMANISTIC', 'EXISTENTIAL', 'GESTALT', 'ANALYTICAL', 'INTERPERSONAL', 'SYSTEMIC', 'EVOLUTIONARY', 'POSITIVE', 'HEALTH',
    'ABNORMAL', 'PSYCHOPATHOLOGY', 'SCHIZOPHRENIA', 'BIPOLAR', 'BORDERLINE', 'NARCISSISTIC', 'ANTISOCIAL', 'AVOIDANT', 'DEPENDENT', 'OBSESSIVE',
    'PHOBIA', 'AGORAPHOBIA', 'SOCIALPHOBIA', 'ACROPHOBIA', 'CLAUSTROPHOBIA', 'ARACHNOPHOBIA', 'OCD', 'PTSD', 'ASD', 'ADHD',
    'DYSCALCULIA', 'DYSLEXIA', 'DYSGRAPHIA', 'DYSPRAXIA', 'APHASIA', 'AGNOSIA', 'AMNESIA', 'DEMENTIA', 'ALZHEIMER', 'PARKINSON'
  ]
}

function generatePuzzle(wordsToPlace) {
  const size = 8
  const grid = Array(size).fill(null).map(() => Array(size).fill(''))
  const placedCells = new Map()
  const placedWords = new Set()
  
  const placeWord = (word) => {
    if (word.length > size) return false
    
    const directions = [
      [0, 1], [1, 0], [1, 1], [-1, 1],
      [0, -1], [-1, 0], [-1, -1], [1, -1]
    ]
    
    for (let attempt = 0; attempt < 100; attempt++) {
      const [dr, dc] = directions[Math.floor(Math.random() * directions.length)]
      const startR = Math.floor(Math.random() * size)
      const startC = Math.floor(Math.random() * size)
      
      let canPlace = true
      for (let i = 0; i < word.length; i++) {
        const r = startR + dr * i
        const c = startC + dc * i
        if (r < 0 || r >= size || c < 0 || c >= size) {
          canPlace = false
          break
        }
        if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
          canPlace = false
          break
        }
      }
      
      if (canPlace) {
        const cells = []
        for (let i = 0; i < word.length; i++) {
          const r = startR + dr * i
          const c = startC + dc * i
          grid[r][c] = word[i]
          cells.push([r, c])
        }
        placedCells.set(word, cells)
        placedWords.add(word)
        return true
      }
    }
    return false
  }

  wordsToPlace.forEach(word => placeWord(word))

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)]
      }
    }
  }

  return { grid, placedCells, placedWords: Array.from(placedWords) }
}

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [subjectWords, setSubjectWords] = useState([])
  const [remainingWords, setRemainingWords] = useState([])
  const [currentWords, setCurrentWords] = useState([])
  const [grid, setGrid] = useState([])
  const [placedCells, setPlacedCells] = useState(new Map())
  const [foundWords, setFoundWords] = useState(new Set())
  const [foundCells, setFoundCells] = useState(new Set())
  const [selectedCells, setSelectedCells] = useState([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [showWin, setShowWin] = useState(false)
  const [round, setRound] = useState(1)
  const timeoutRef = useRef(null)

  const startNewRound = (words) => {
    let wordsToUse = []
    let attempts = 0
    const maxAttempts = 50
    
    while (wordsToUse.length < 8 && attempts < maxAttempts) {
      const shuffled = [...words].sort(() => Math.random() - 0.5)
      const testWords = shuffled.slice(0, 10)
      const { placedWords } = generatePuzzle(testWords)
      
      if (placedWords.length >= 8) {
        wordsToUse = placedWords.slice(0, 8)
        break
      }
      attempts++
    }
    
    if (wordsToUse.length < 8) {
      const shuffled = [...words].sort(() => Math.random() - 0.5)
      wordsToUse = shuffled.slice(0, 8)
    }
    
    const { grid: newGrid, placedCells: cells, placedWords: actualPlaced } = generatePuzzle(wordsToUse)
    setCurrentWords(actualPlaced)
    setGrid(newGrid)
    setPlacedCells(cells)
    setFoundWords(new Set())
    setFoundCells(new Set())
    setShowWin(false)
    setSelectedCells([])
    setIsSelecting(false)
  }

  const selectSubject = (subject) => {
    const words = [...SUBJECTS[subject]]
    setSubjectWords(words)
    setRemainingWords(words)
    setSelectedSubject(subject)
    setRound(1)
    startNewRound(words)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (showWin && selectedSubject) {
      const remaining = remainingWords.filter(w => !foundWords.has(w))
      
      timeoutRef.current = setTimeout(() => {
        if (remaining.length >= 8) {
          setRound(r => r + 1)
          startNewRound(remaining)
        } else {
          setShowWin(true)
        }
      }, 2500)
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [showWin])

  const getCellColor = (rowIndex, colIndex) => {
    const isSelected = selectedCells.some(([r, c]) => r === rowIndex && c === colIndex)
    if (isSelected) {
      return '#4ade80'
    }
    if (foundCells.has(`${rowIndex}-${colIndex}`)) {
      return '#4ade80'
    }
    return (rowIndex + colIndex) % 2 === 0 ? '#e8d4b8' : '#a67c52'
  }

  const handleMouseDown = (rowIndex, colIndex) => {
    setIsSelecting(true)
    setSelectedCells([[rowIndex, colIndex]])
  }

  const handleMouseEnter = (rowIndex, colIndex) => {
    if (!isSelecting) return
    
    const start = selectedCells[0]
    const dr = Math.sign(rowIndex - start[0])
    const dc = Math.sign(colIndex - start[1])
    
    if (dr === 0 && dc === 0) return
    
    const cells = []
    let r = start[0]
    let c = start[1]
    
    while (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
      cells.push([r, c])
      if (r === rowIndex && c === colIndex) break
      r += dr
      c += dc
    }
    
    setSelectedCells(cells)
  }

  const handleMouseUp = () => {
    if (!isSelecting) return
    
    const selectedWord = selectedCells.map(([r, c]) => grid[r][c]).join('')
    const reversedWord = selectedWord.split('').reverse().join('')
    
    let found = null
    if (currentWords.includes(selectedWord) && !foundWords.has(selectedWord)) {
      found = selectedWord
    } else if (currentWords.includes(reversedWord) && !foundWords.has(reversedWord)) {
      found = reversedWord
    }
    
    if (found) {
      const newFound = new Set(foundWords)
      newFound.add(found)
      setFoundWords(newFound)
      
      const cells = placedCells.get(found)
      if (cells) {
        const newFoundCells = new Set(foundCells)
        cells.forEach(([r, c]) => {
          newFoundCells.add(`${r}-${c}`)
        })
        setFoundCells(newFoundCells)
      }
      
      const newRemaining = remainingWords.filter(w => !newFound.has(w))
      setRemainingWords(newRemaining)
      
      if (newFound.size === currentWords.length) {
        setShowWin(true)
      }
    }
    
    setIsSelecting(false)
    setSelectedCells([])
  }

  if (!selectedSubject) {
    return (
      <div className="game-container">
        <h1>Word Search</h1>
        <p className="hint">Choose a subject to start playing!</p>
        
        <div className="subjects-grid">
          {Object.keys(SUBJECTS).map(subject => (
            <button
              key={subject}
              className="subject-btn"
              onClick={() => selectSubject(subject)}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="game-container" onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp}>
      <button className="back-btn" onClick={() => { setSelectedSubject(null); setSubjectWords([]) }}>
        ← Back
      </button>
      
      <h1>{selectedSubject}</h1>
      <p className="hint">Click and drag to select words!</p>
      
      <div className="round-info">
        <span>Round {round}</span>
      </div>
      
      <div className="words-list">
        {currentWords.map(word => (
          <span 
            key={word} 
            className={`word ${foundWords.has(word) ? 'found' : ''}`}
          >
            {word}
          </span>
        ))}
      </div>

      <div className="grid" onMouseLeave={() => { setIsSelecting(false); setSelectedCells([]) }}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${foundCells.has(`${rowIndex}-${colIndex}`) ? 'crossed' : ''}`}
                style={{ backgroundColor: grid.length ? getCellColor(rowIndex, colIndex) : '#e8d4b8' }}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              >
                <span className="letter">{cell}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {showWin && remainingWords.length === 0 && (
        <div className="win-message">
          🎉 Amazing! You found all {subjectWords.length} words!
        </div>
      )}

      {showWin && remainingWords.length >= 8 && (
        <div className="win-message">
          🎉 Round Complete!
        </div>
      )}
    </div>
  )
}

export default App
