import { useEffect, useState } from 'react'
import { ArrowUpRight, BedDouble, Building2, Check, MapPin, Search, SlidersHorizontal } from 'lucide-react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import { properties } from '../../data/properties'
import { publicRequest } from '../../services/api'

export default function Properties() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('All locations')
  const [type, setType] = useState('All types')
  const [budget, setBudget] = useState('Any budget')
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [catalog, setCatalog] = useState(properties)
  useEffect(() => {
    publicRequest('properties')
      .then((result) => {
        if (result.items.length) {
          setCatalog(result.items.map((item) => ({
            ...item,
            image: item.images?.[0] || '',
            price: `${item.currency} ${Number(item.price).toLocaleString()}`,
            status: item.status,
            purpose: item.purpose,
            furnishing: 'To be confirmed',
            developer: 'EstatePro listing',
            amenities: [],
            value: item.price,
          })))
        }
      })
      .catch(() => {})
  }, [])
  const locations = ['All locations', ...new Set(catalog.map((property) => property.location))]
  const types = ['All types', ...new Set(catalog.map((property) => property.type))]

  function startPropertyEnquiry(property) {
    sessionStorage.setItem('estatepro_pending_item', JSON.stringify({ type: 'property', item: property }))
    window.location.href = '/signup'
  }

  const filteredProperties = catalog.filter((property) => {
    const matchesSearch = `${property.title} ${property.location}`.toLowerCase().includes(search.toLowerCase())
    const matchesLocation = location === 'All locations' || property.location === location
    const matchesType = type === 'All types' || property.type === type
    const matchesBudget = budget === 'Any budget' ||
      (budget === 'Under AED 2M' && property.value < 2000000) ||
      (budget === 'AED 2M - 5M' && property.value >= 2000000 && property.value <= 5000000) ||
      (budget === 'Above AED 5M' && property.value > 5000000)
    return matchesSearch && matchesLocation && matchesType && matchesBudget
  })

  return <><Navbar light /><main className="property-page">
    <section className="property-hero">
      <div className="property-hero-overlay" />
      <div className="container property-hero-content">
        <div className="eyebrow light"><span /> THE ESTATEPRO PROPERTY NETWORK</div>
        <h1>Spaces that create<br /><em>new possibilities.</em></h1>
        <p>Explore illustrative Dubai properties and find the right starting point for your next buyer conversation.</p>
        <div className="property-hero-note"><span>01</span> Curated for broker exploration</div>
      </div>
    </section>

    <section className="property-listing-area section">
      <div className="container">
        <div className="property-page-heading">
          <div><div className="eyebrow"><span /> CURATED OPPORTUNITIES</div><h2>Find a place to<br /><em>begin.</em></h2></div>
          <p>Search our sample collection by location, property type, or budget. Listings and prices require verification before they can be marketed or presented to buyers.</p>
        </div>

        <div className="property-search-panel">
          <label className="property-search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by property or location" /></label>
          <label><MapPin size={16} /><select value={location} onChange={(event) => setLocation(event.target.value)}>{locations.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><Building2 size={16} /><select value={type} onChange={(event) => setType(event.target.value)}>{types.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><SlidersHorizontal size={16} /><select value={budget} onChange={(event) => setBudget(event.target.value)}><option>Any budget</option><option>Under AED 2M</option><option>AED 2M - 5M</option><option>Above AED 5M</option></select></label>
        </div>

        <div className="property-result-row"><span>{filteredProperties.length} sample properties</span><strong>SAMPLE DATA · NOT VERIFIED</strong></div>
        {filteredProperties.length > 0 ? <div className="property-page-grid">{filteredProperties.map((property) => <article className="property-page-card" key={property.title}>
          <div className="property-page-image" style={{ backgroundImage: `url(${property.image})` }}><span>{property.status}</span><button aria-label={`Save ${property.title}`}>♡</button></div>
          <div className="property-page-card-body"><div className="property-card-tags"><span>{property.purpose}</span><span>{property.furnishing}</span></div><div className="location"><MapPin size={14} /> {property.location}</div><h3>{property.title}</h3><p className="property-description">{property.description}</p><div className="property-page-specs"><span><BedDouble size={15} /> {property.beds} beds</span><span>{property.baths} baths</span><span>{property.area} sq ft</span></div><div className="property-extra-data"><span>Developer <strong>{property.developer}</strong></span><span>Highlights <strong>{property.amenities.join(' · ')}</strong></span></div><div className="property-page-footer"><strong>{property.price}</strong><button className="text-link" onClick={() => setSelectedProperty(property)}>View details <ArrowUpRight size={14} /></button></div></div>
        </article>)}</div> : <div className="property-empty"><Building2 size={28} /><h3>No matching properties</h3><p>Try changing your search or filters to see more sample listings.</p></div>}
      </div>
    </section>
    <section className="property-disclaimer"><div className="container"><strong>Before presenting a property</strong><span>Confirm listing authorization, availability, pricing, licensing requirements, and commercial terms with the authorized EstatePro team.</span><a href="/signup">Join as a broker <ArrowUpRight size={15} /></a></div></section>
    {selectedProperty && <div className="property-modal-backdrop" onClick={() => setSelectedProperty(null)}><div className="property-modal" onClick={(event) => event.stopPropagation()}><button className="property-modal-close" onClick={() => setSelectedProperty(null)}>×</button><div className="property-modal-image" style={{ backgroundImage: `url(${selectedProperty.image})` }} /><div className="property-modal-content"><div className="eyebrow"><span /> SAMPLE PROPERTY DETAILS</div><h2>{selectedProperty.title}</h2><p>{selectedProperty.description}</p><div className="property-modal-grid"><span>Location<strong>{selectedProperty.location}</strong></span><span>Price<strong>{selectedProperty.price}</strong></span><span>Type<strong>{selectedProperty.type}</strong></span><span>Handover<strong>{selectedProperty.status}</strong></span><span>Bedrooms<strong>{selectedProperty.beds}</strong></span><span>Bathrooms<strong>{selectedProperty.baths}</strong></span></div><h4>Property highlights</h4><ul>{selectedProperty.amenities.map((amenity) => <li key={amenity}><Check size={14} /> {amenity}</li>)}</ul><button className="btn btn-gold" onClick={() => startPropertyEnquiry(selectedProperty)}>Enquire to market <ArrowUpRight size={16} /></button></div></div></div>}
  </main><Footer /></>
}
