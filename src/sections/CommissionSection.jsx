import { ChevronRight } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading'

const earningSteps = ['Learn the sales process', 'Find interested buyers', 'Coordinate property enquiries', 'Follow the authorized process', 'Receive eligible compensation under agreed terms']

export default function Earnings() {
  return <section className="section earnings"><div className="container earnings-layout"><SectionHeading eyebrow="A TRANSPARENT MODEL" title={<>Built for the<br /><em>long game.</em></>} copy="We believe in clear expectations. EstatePro supports your process — it does not promise guaranteed income or outcomes." /><div className="earnings-steps">{earningSteps.map((step, index) => <div key={step} className="earning-step"><span>0{index + 1}</span><p>{step}</p>{index < 4 && <ChevronRight size={17} />}</div>)}</div></div></section>
}
