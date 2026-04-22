import { useEffect } from 'react'
import useStore from './store'
import { useTheme } from './hooks/useTheme'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import StepSpecialty from './components/steps/StepSpecialty'
import StepDictation from './components/steps/StepDictation'
import StepDocuments from './components/steps/StepDocuments'
import StepReview from './components/steps/StepReview'

export default function App() {
  const step = useStore((s) => s.step)
  useTheme()

  return (
    <div className="layout">
      <Topbar />
      <div className="main-wrap">
        <Sidebar />
        <div className="content">
          <StepSpecialty active={step === 1} />
          <StepDictation active={step === 2} />
          <StepDocuments active={step === 3} />
          <StepReview active={step === 4} />
        </div>
      </div>
    </div>
  )
}
