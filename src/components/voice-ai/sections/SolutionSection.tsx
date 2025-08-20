'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { FiPlay, FiPause, FiVolume2, FiMic, FiMessageSquare, FiCheck } from 'react-icons/fi'
import { useLanguage } from '@/lib/i18n/language-context'
import { translations } from '@/lib/i18n/translations'

interface SolutionSectionProps {
  currentLang?: 'nl' | 'en';
}

export default function SolutionSection({ currentLang }: SolutionSectionProps) {
  const { language: contextLanguage } = useLanguage()
  const language = currentLang || contextLanguage
  const t = translations[language].voiceAI
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentDemo, setCurrentDemo] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const demoScenarios = [
    {
      title: t.solution.demoScenarios[0].title,
      description: t.solution.demoScenarios[0].description,
      audioFile: `klant-service-${language}.m4a`,
      transcript: language === 'nl' ? [
        { speaker: "Klant", text: "Hallo, ik heb een vraag over mijn account. Ik wil graag mijn verzendadres wijzigen." },
        { speaker: "AI", text: "Ik help je graag met het wijzigen van je verzendadres. Voor de veiligheid stuur ik eerst een verificatiecode naar je geregistreerde telefoonnummer. Kun je bevestigen dat het eindigt op 4567?" },
        { speaker: "Klant", text: "Ja, dat klopt. Ik heb de code ontvangen, het is 8392." },
        { speaker: "AI", text: "Perfect, je bent geverifieerd. Wat is je nieuwe verzendadres? Ik kan het direct voor je aanpassen in het systeem." }
      ] : [
        { speaker: "Customer", text: "Hi, I have a question about my account. I'd like to update my shipping address." },
        { speaker: "AI", text: "I'd be happy to help you update your shipping address. For security, I'll first send a verification code to your registered phone number. Can you confirm it ends in 4567?" },
        { speaker: "Customer", text: "Yes, that's correct. I received the code, it's 8392." },
        { speaker: "AI", text: "Perfect, you're verified. What's your new shipping address? I can update it in the system right away." }
      ],
      duration: "2:34",
      outcome: language === 'nl' ? "Klant geholpen, probleem opgelost" : "Customer helped, issue resolved"
    },
    {
      title: t.solution.demoScenarios[1].title,
      description: t.solution.demoScenarios[1].description,
      audioFile: `appointment-${language}.m4a`,
      transcript: language === 'nl' ? [
        { speaker: "Klant", text: "Ik moet een consultatie inplannen voor volgende week." },
        { speaker: "AI", text: "Ik help je graag met het inplannen van die consultatie. Ik heb beschikbaarheid op dinsdag om 14:00, woensdag om 10:00, of vrijdag om 15:00. Welke tijd komt het beste uit?" },
        { speaker: "Klant", text: "Woensdag om 10:00 klinkt perfect." },
        { speaker: "AI", text: "Uitstekend! Ik heb je consultatie geboekt voor woensdag 15 maart om 10:00. Je ontvangt binnenkort een bevestigingsmail met alle details." }
      ] : [
        { speaker: "Customer", text: "I need to schedule a consultation for next week." },
        { speaker: "AI", text: "I'd be happy to help you schedule that consultation. I have availability on Tuesday at 2:00 PM, Wednesday at 10:00 AM, or Friday at 3:00 PM. Which time works best for you?" },
        { speaker: "Customer", text: "Wednesday at 10:00 AM sounds perfect." },
        { speaker: "AI", text: "Excellent! I've booked your consultation for Wednesday, March 15th at 10:00 AM. You'll receive a confirmation email shortly with all the details." }
      ],
      duration: "1:45",
      outcome: language === 'nl' ? "Afspraak geboekt, bevestiging verzonden" : "Appointment booked, confirmation sent"
    },
    // {
    //   title: t.solution.demoScenarios[2].title,
    //   description: t.solution.demoScenarios[2].description,
    //   transcript: [
    //     { speaker: "Klant", text: "Mijn app werkt niet goed. Hij crasht elke keer als ik probeer in te loggen." },
    //     { speaker: "AI", text: "Het spijt me dat je problemen ondervindt met de app. Laten we dit snel oplossen. Kun je me eerst vertellen welk apparaat je gebruikt en wanneer dit begon?" },
    //     { speaker: "Klant", text: "Ik gebruik een iPhone 14, en het begon vanmorgen." },
    //     { speaker: "AI", text: "Dank je voor die informatie. Dit lijkt op een veel voorkomend probleem dat we kunnen oplossen. Laten we eerst de app herstarten - sluit hem volledig af en open hem opnieuw. Als dat niet werkt, proberen we de volgende stap." }
    //   ],
    //   duration: "3:12",
    //   outcome: "Probleem gediagnosticeerd, oplossing geboden"
    // }
  ]

  // Update audio source when demo changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.load()
      setIsPlaying(false)
    }
  }, [currentDemo, language])

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section data-section="solution" className="section-padding bg-gray-100/30">
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl text-slate-900 mb-4 font-sans font-semibold">
            {t.solution.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.solution.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Demo Player */}
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Demo Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {demoScenarios.map((scenario, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDemo(index)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentDemo === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-600/10'
                  }`}
                >
                  {scenario.title}
                </button>
              ))}
            </div>

            {/* Audio Player Interface */}
            <div className="bg-gray-100/50 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={toggleAudio}
                  className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
                >
                  {isPlaying ? <FiPause className="text-lg" /> : <FiPlay className="text-lg ml-1" />}
                </button>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">
                    {demoScenarios[currentDemo].title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {demoScenarios[currentDemo].description}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <FiVolume2 />
                  <span className="text-sm">{demoScenarios[currentDemo].duration}</span>
                </div>
              </div>

              {/* Waveform Simulation */}
              <div className="flex items-center gap-1 h-8">
                {Array.from({ length: 40 }).map((_, i) => {
                  // Use deterministic values based on index to avoid hydration mismatch
                  const baseHeight = 8 + (i % 5) * 4; // Height between 8-28px
                  const animatedHeight = 8 + ((i * 3) % 20); // Animated height pattern
                  const opacity = isPlaying && i < 30 ? 1 : 0.3;
                  const duration = 0.5 + (i % 3) * 0.2; // Duration between 0.5-0.9s
                  
                  return (
                    <motion.div
                      key={i}
                      className={`w-1 bg-blue-600 rounded-full ${
                        isPlaying ? 'animate-pulse' : ''
                      }`}
                      style={{ 
                        height: `${baseHeight}px`,
                        opacity
                      }}
                      animate={isPlaying ? {
                        height: [
                          `${baseHeight}px`,
                          `${animatedHeight}px`,
                        ]
                      } : {}}
                      transition={{ 
                        duration,
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                    />
                  )
                })}
              </div>
            </div>

            {/* Outcome Badge */}
            <div className="flex items-center gap-2 p-3 bg-green-500/10 text-green-500 rounded-lg">
              <FiCheck className="text-lg" />
              <span className="font-medium">{demoScenarios[currentDemo].outcome}</span>
            </div>

            {/* Hidden audio element for demonstration */}
            <audio
              ref={audioRef}
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              style={{ display: 'none' }}
            >
              <source 
                src={`/voice-ai/${demoScenarios[currentDemo].audioFile}`}
                type="audio/mp4" 
              />
            </audio>
          </motion.div>

          {/* Conversation Transcript */}
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-xl h-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <FiMessageSquare className="text-xl text-blue-600" />
              <h3 className="text-xl font-semibold text-slate-900">{t.solution.liveTranscript}</h3>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {demoScenarios[currentDemo].transcript.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex gap-3 ${message.speaker === 'AI' ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {message.speaker === 'AI' && (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiMic className="text-white text-sm" />
                    </div>
                  )}
                  
                  <div className={`max-w-xs lg:max-w-sm p-3 rounded-lg ${
                    message.speaker === 'AI'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white ml-auto'
                  }`}>
                    <div className="text-xs opacity-70 mb-1">
                      {message.speaker}
                    </div>
                    <div className="text-sm">
                      {message.text}
                    </div>
                  </div>

                  {message.speaker === 'Klant' && (
                    <div className="w-8 h-8 bg-warm-gray rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-semibold">K</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Key Features */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {t.solution.keyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 group hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}