const propertiesData = [
  { title: 'Marina Crest Residences', location: 'Dubai Marina', type: 'Apartment', beds: 2, baths: 2, area: '1,284', price: 'AED 1.85M', value: 1850000, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Downtown Vista Suite', location: 'Downtown Dubai', type: 'Apartment', beds: 1, baths: 2, area: '876', price: 'AED 1.42M', value: 1420000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Palm Azure Villa', location: 'Palm Jumeirah', type: 'Villa', beds: 5, baths: 6, area: '5,940', price: 'AED 8.75M', value: 8750000, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Hillside Garden Home', location: 'Dubai Hills Estate', type: 'Townhouse', beds: 4, baths: 5, area: '3,128', price: 'AED 3.28M', value: 3280000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85' },
  {title: 'Jumeirah Bay Penthouse', location: 'Jumeirah Beach Residence', type: 'Penthouse', beds: 3, baths: 4, area: '2,450', price: 'AED 5.15M', value: 5150000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Cityscape Loft', location: 'Business Bay', type: 'Loft', beds: 2, baths: 2, area: '1,150', price: 'AED 1.95M', value: 1950000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Skyline View Apartment', location: 'Downtown Dubai', type: 'Apartment', beds: 3, baths: 3, area: '1,750', price: 'AED 2.75M', value: 2750000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Seaside Retreat Villa', location: 'Palm Jumeirah', type: 'Villa', beds: 6, baths: 7, area: '6,500', price: 'AED 12.5M', value: 12500000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Urban Oasis Townhouse', location: 'Dubai Hills Estate', type: 'Townhouse', beds: 4, baths: 4, area: '3,200', price: 'AED 3.5M', value: 3500000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Luxury Marina Penthouse', location: 'Dubai Marina', type: 'Penthouse', beds: 5, baths: 6, area: '4,500', price: 'AED 9.8M', value: 9800000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Downtown Skyline Apartment', location: 'Downtown Dubai', type: 'Apartment', beds: 2, baths: 2, area: '1,200', price: 'AED 1.95M', value: 1950000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Palm Jumeirah Beachfront Villa', location: 'Palm Jumeirah', type: 'Villa', beds: 7, baths: 8, area: '7,200', price: 'AED 15.2M', value: 15200000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Dubai Hills Estate Townhouse', location: 'Dubai Hills Estate', type: 'Townhouse', beds: 3, baths: 3, area: '2,800', price: 'AED 3.1M', value: 3100000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Marina Bay Penthouse', location: 'Dubai Marina', type: 'Penthouse', beds: 4, baths: 5, area: '3,800', price: 'AED 7.2M', value: 7200000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85' },  
  { title: 'Downtown Dubai Loft', location: 'Downtown Dubai', type: 'Loft', beds: 1, baths: 1, area: '950', price: 'AED 1.65M', value: 1650000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Dubai Hills Estate Modern Townhouse', location: 'Dubai Hills Estate', type: 'Townhouse', beds: 4, baths: 4, area: '3,400', price: 'AED 3.6M', value: 3600000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Marina Skyline Penthouse', location: 'Dubai Marina', type: 'Penthouse', beds: 5, baths: 6, area: '4,200', price: 'AED 8.9M', value: 8900000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Downtown Dubai Contemporary Loft', location: 'Downtown Dubai', type: 'Loft', beds: 2, baths: 2, area: '1,100', price: 'AED 2.1M', value: 2100000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Palm Jumeirah Exclusive Villa', location: 'Palm Jumeirah', type: 'Villa', beds: 9, baths: 10, area: '9,800', price: 'AED 22.5M', value: 22500000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Dubai Hills Estate Premium Townhouse', location: 'Dubai Hills Estate', type: 'Townhouse', beds: 5, baths: 5, area: '3,800', price: 'AED 4.2M', value: 4200000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Marina Waterfront Penthouse', location: 'Dubai Marina', type: 'Penthouse', beds: 6, baths: 7, area: '5,000', price: 'AED 10.5M', value: 10500000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Downtown Dubai Chic Loft', location: 'Downtown Dubai', type: 'Loft', beds: 1, baths: 1, area: '900', price: 'AED 1.55M', value: 1550000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Palm Jumeirah Grand Villa', location: 'Palm Jumeirah', type: 'Villa', beds: 10, baths: 11, area: '10,500', price: 'AED 25.8M', value: 25800000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Dubai Hills Estate Luxurious Townhouse', location: 'Dubai Hills Estate', type: 'Townhouse', beds: 6, baths: 6, area: '4,200', price: 'AED 4.8M', value: 4800000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Marina Elite Penthouse', location: 'Dubai Marina', type: 'Penthouse', beds: 7, baths: 8, area: '5,800', price: 'AED 12.8M', value: 12800000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Downtown Dubai Modern Loft', location: 'Downtown Dubai', type: 'Loft', beds: 2, baths: 2, area: '1,200', price: 'AED 2.3M', value: 2300000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Palm Jumeirah Signature Villa', location: 'Palm Jumeirah', type: 'Villa', beds: 11, baths: 12, area: '11,500', price: 'AED 30.2M', value: 30200000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Dubai Hills Estate Contemporary Townhouse', location: 'Dubai Hills Estate', type: 'Townhouse', beds: 7, baths: 7, area: '4,800', price: 'AED 5.5M', value: 5500000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85' },
  
]

const extraDetails = [
  ['Ready to move', 'Furnished', 'Marina Living', 'Private beach access, infinity pool, gym'],
  ['Ready to move', 'Semi-furnished', 'Downtown Collection', 'Burj Khalifa views, concierge, residents lounge'],
  ['Q4 2026 handover', 'Unfurnished', 'Palm Developments', 'Private pool, beach access, landscaped garden'],
  ['Ready to move', 'Semi-furnished', 'Hills Estate Living', 'Community park, golf views, smart home'],
]

export const properties = propertiesData.map((property, index) => {
  const [status, furnishing, developer, amenities] = extraDetails[index % extraDetails.length]
  return {
    ...property,
    status,
    furnishing,
    developer,
    amenities: amenities.split(', '),
    purpose: index % 3 === 0 ? 'For sale' : 'Investment opportunity',
    description: `${property.title} is an illustrative ${property.type.toLowerCase()} opportunity in ${property.location}, prepared for broker and buyer conversations.`,
  }
})
