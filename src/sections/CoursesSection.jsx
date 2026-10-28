import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Clock3, Play } from 'lucide-react'
import { courses } from '../data/courses'
import SectionHeading from '../components/common/SectionHeading'
import { publicRequest } from '../services/api'

export default function CoursesSection({ limit }) {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [catalog, setCatalog] = useState(courses)
  useEffect(() => { publicRequest('courses').then((result) => { if (result.items.length) setCatalog(result.items) }).catch(() => {}) }, [])
  const visibleCourses = limit ? catalog.slice(0, limit) : catalog
  function startPurchase(course) {
    sessionStorage.setItem('estatepro_pending_item', JSON.stringify({ type: 'course', item: course }))
    window.location.href = '/signup'
  }
  return <><section id="courses" className={`section courses ${limit ? 'home-courses' : 'catalog-courses'}`}><div className="container"><div className="catalog-heading"><SectionHeading eyebrow="LEARN THE CRAFT" title={<>Knowledge that moves<br /><em>with the market.</em></>} copy="Practical, self-paced learning for the realities of selling property in Dubai." />{!limit && <span className="catalog-count">{visibleCourses.length} courses available</span>}</div><div className="course-grid">{visibleCourses.map((course, index) => <article className="course-card" key={`${course.title}-${index}`}><div className="course-image" style={{ backgroundImage: `url(${course.image})` }}><span>{course.level}</span><button aria-label={`Preview ${course.title}`} onClick={() => setSelectedCourse(course)}><Play size={15} fill="currentColor" /></button></div><div className="card-body"><div className="meta"><span><Clock3 size={14} /> {course.duration}</span><span>{course.price}</span></div><h3>{course.title}</h3><p>{course.description}</p><button className="text-link" onClick={() => setSelectedCourse(course)}>View details <ArrowUpRight size={15} /></button></div></article>)}</div></div></section>
    {selectedCourse && <div className="property-modal-backdrop" onClick={() => setSelectedCourse(null)}><div className="property-modal course-modal" onClick={(event) => event.stopPropagation()}><button className="property-modal-close" onClick={() => setSelectedCourse(null)} aria-label="Close course details">×</button><div className="property-modal-image" style={{ backgroundImage: `url(${selectedCourse.image})` }} /><div className="property-modal-content"><div className="eyebrow"><span /> COURSE DETAILS</div><h2>{selectedCourse.title}</h2><p>{selectedCourse.description}</p><div className="property-modal-grid"><span>Level<strong>{selectedCourse.level}</strong></span><span>Price<strong>{selectedCourse.price}</strong></span><span>Format<strong>Self-paced learning</strong></span><span>Duration<strong>{selectedCourse.duration}</strong></span></div><h4>What you will explore</h4><ul><li><Check size={14} /> Market knowledge and practical concepts</li><li><Check size={14} /> Broker-focused sales guidance</li><li><Check size={14} /> Learning resources for client conversations</li></ul><button className="btn btn-gold" onClick={() => startPurchase(selectedCourse)}>Buy Now <ArrowUpRight size={16} /></button></div></div></div>}
  </>
}
