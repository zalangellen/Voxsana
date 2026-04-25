import useStore from './store'
import { useTheme } from './hooks/useTheme'
import Landing from './components/Landing'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import ProgressBar from './components/ProgressBar'
import StepAbout from './components/StepAbout'
import StepSpecialty from './components/steps/StepSpecialty'
import StepDictation from './components/steps/StepDictation'
import StepDocuments from './components/steps/StepDocuments'
import StepReview from './components/steps/StepReview'

export default function App() {
  const step        = useStore((s) => s.step)
  const showAbout   = useStore((s) => s.showAbout)
  const showLanding = useStore((s) => s.showLanding)
  useTheme()

  if (showLanding) return <Landing />

  return (
    <>
      <Topbar />
      <div className="app">
        <Sidebar />
        <main className="main">
          <StepAbout    active={showAbout} />
          <StepSpecialty active={!showAbout && step === 1} />
          <StepDictation active={!showAbout && step === 2} />
          <StepDocuments active={!showAbout && step === 3} />
          <StepReview    active={!showAbout && step === 4} />
        </main>
      </div>
      <ProgressBar />
    </>
  )
}
