import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, BedDouble, Building2, MapPin, Search } from 'lucide-react'
import { properties } from '../data/properties'
import SectionHeading from '../components/common/SectionHeading'
import { publicRequest } from '../services/api'

export default function PropertySection({ limit }) {
  const [location, setLocation] = useState('All locations')
  const [type, setType] = useState('All types')
  const [catalog, setCatalog] = useState(properties)
  useEffect(() => { publicRequest('properties').then((result) => { if (result.items.length) setCatalog(result.items.map((item) => ({ ...item, image: item.images?.[0] || '', price: `${item.currency} ${Number(item.price).toLocaleString()}`, status: item.status, purpose: item.purpose }))) }).catch(() => {}) }, [])
  const filteredProperties = useMemo(() => catalog.filter(p => (location === 'All locations' || p.location === location) && (type === 'All types' || p.type === type)), [catalog, location, type])
  const visibleProperties = limit ? filteredProperties.slice(0, limit) : filteredProperties
  return <section id="properties" className="section properties"><div className="container"><div className="property-top"><SectionHeading eyebrow="CURATED OPPORTUNITIES" title={<>Find your next<br /><em>conversation.</em></>} copy="Illustrative listings for exploration. All properties and prices are sample data until verified and authorized." /><button className="outline-btn">View all properties <ArrowUpRight size={16} /></button></div><div className="filters"><div><Search size={16} /><select value={location} onChange={e => setLocation(e.target.value)}><option>All locations</option>{[...new Set(catalog.map(p => p.location))].map(x => <option key={x}>{x}</option>)}</select></div><div><Building2 size={16} /><select value={type} onChange={e => setType(e.target.value)}><option>All types</option>{[...new Set(catalog.map(p => p.type))].map(x => <option key={x}>{x}</option>)}</select></div><span className="sample-pill">SAMPLE DATA · NOT VERIFIED</span></div><div className="property-grid">{visibleProperties.map(p => <article className="property-card" key={p.title}><div className="property-image" style={{ backgroundImage: `url(${p.image})` }}><span className="listing-tag">{p.illustrative === false ? p.status : 'Illustrative listing'}</span><button className="heart" aria-label="Save property">♡</button></div><div className="card-body"><div className="location"><MapPin size={14} /> {p.location}</div><h3>{p.title}</h3><div className="property-specs"><span><BedDouble size={15} /> {p.beds} Beds</span><span>{p.baths} Baths</span><span>{p.area} sq ft</span></div><div className="property-bottom"><strong>{p.price}</strong><button className="text-link">Details <ArrowUpRight size={14} /></button></div></div></article>)}</div>{visibleProperties.length === 0 && <div className="empty">No sample listings match those filters.</div>}</div></section>
}
