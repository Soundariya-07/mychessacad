import React from 'react'

export default function PricingSection() {
  return (
    <div style={{ 
      minHeight: '400px', 
      backgroundColor: 'yellow',
      border: '8px solid blue',
      padding: '2rem',
      margin: '2rem 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'black',
            marginBottom: '1rem'
          }}>
            DEBUG PRICING SECTION
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: 'black',
            marginBottom: '2rem'
          }}>
            This is a test of the pricing section visibility
          </p>
          <div style={{
            height: '8rem',
            backgroundColor: 'purple',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid white'
          }}>
            <span style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              DEBUG: Pricing Content Should Be Visible
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 