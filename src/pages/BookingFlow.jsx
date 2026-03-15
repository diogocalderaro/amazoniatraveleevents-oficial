import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, User, CreditCard, CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

const BookingFlow = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // Step Indicators
  const renderStepper = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: step >= 1 ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: step >= 1 ? 700 : 500 }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: step >= 1 ? 'var(--color-primary)' : '#E2E8F0', color: step >= 1 ? 'var(--color-secondary)' : 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
        <span>Dates</span>
      </div>
      <ChevronRight size={16} className="text-muted" />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: step >= 2 ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: step >= 2 ? 700 : 500 }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: step >= 2 ? 'var(--color-primary)' : '#E2E8F0', color: step >= 2 ? 'var(--color-secondary)' : 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>
        <span>Details</span>
      </div>
      <ChevronRight size={16} className="text-muted" />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: step >= 3 ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: step >= 3 ? 700 : 500 }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: step >= 3 ? 'var(--color-primary)' : '#E2E8F0', color: step >= 3 ? 'var(--color-secondary)' : 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
        <span>Payment</span>
      </div>
      <ChevronRight size={16} className="text-muted" />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: step >= 4 ? 'var(--color-accent)' : 'var(--color-text-muted)', fontWeight: step >= 4 ? 700 : 500 }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: step >= 4 ? 'var(--color-accent)' : '#E2E8F0', color: step >= 4 ? '#fff' : 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</div>
        <span>Done</span>
      </div>
    </div>
  );

  return (
    <div className="booking-page" style={{ backgroundColor: 'var(--color-bg-alt)', minHeight: '80vh', padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {step < 4 && (
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Secure Checkout</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>Complete your reservation for the Himalayan Adventure Trail</p>
          </div>
        )}

        {step < 4 && renderStepper()}

        <div className="card" style={{ padding: '2rem' }}>
          
          {/* STEP 1: Date & Travelers */}
          {step === 1 && (
            <div className="step-1 fade-in">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Calendar className="text-primary" /> Select Travel Dates
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Start Date</label>
                  <input type="date" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', outline: 'none', fontFamily: 'var(--font-body)' }} defaultValue="2026-05-15" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>End Date</label>
                  <input type="date" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', outline: 'none', fontFamily: 'var(--font-body)', backgroundColor: '#F8FAFC' }} defaultValue="2026-05-19" readOnly />
                </div>
              </div>

              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '3rem' }}>
                <User className="text-primary" /> Travelers
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>Adults</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Age 18+</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <button style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #E2E8F0', backgroundColor: '#fff', cursor: 'pointer' }}>-</button>
                     <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>2</span>
                     <button style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #E2E8F0', backgroundColor: '#fff', cursor: 'pointer' }}>+</button>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>Children</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Age 12-17</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <button style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #E2E8F0', backgroundColor: '#fff', cursor: 'pointer', color: '#CBD5E1' }}>-</button>
                     <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>0</span>
                     <button style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #E2E8F0', backgroundColor: '#fff', cursor: 'pointer' }}>+</button>
                  </div>
                </div>
              </div>

              {/* Order Summary preview */}
              <div style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
                    <span>Himalayan Adventure Trail x 2</span>
                    <span>$1,798</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    <span>Taxes & Fees</span>
                    <span>$120</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px dashed #CBD5E1', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-secondary)' }}>
                    <span>Total</span>
                    <span>$1,918</span>
                 </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={nextStep}>
                  Continue to Details <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Passenger Details */}
          {step === 2 && (
            <div className="step-2 fade-in">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <User className="text-primary" /> Lead Traveler Details
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>First Name</label>
                  <input type="text" placeholder="John" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', outline: 'none', fontFamily: 'var(--font-body)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Last Name</label>
                  <input type="text" placeholder="Doe" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', outline: 'none', fontFamily: 'var(--font-body)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Email Address</label>
                  <input type="email" placeholder="john@example.com" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', outline: 'none', fontFamily: 'var(--font-body)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', outline: 'none', fontFamily: 'var(--font-body)' }} />
                </div>
              </div>

              <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Additional Options</h3>
              <div style={{ padding: '1rem', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <input type="checkbox" id="insurance" style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)' }} />
                <label htmlFor="insurance" style={{ flex: 1, cursor: 'pointer' }}>
                  <div style={{ fontWeight: 600 }}>Add Travel Insurance (+$45/person)</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Highly recommended for international trips. Covers medical, cancellation and lost baggage.</div>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="btn" style={{ padding: '0.5rem 1rem', color: 'var(--color-text-muted)' }} onClick={prevStep}>
                  <ArrowLeft size={18} /> Back
                </button>
                <button className="btn btn-primary" onClick={nextStep}>
                  Continue to Payment <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {step === 3 && (
            <div className="step-3 fade-in">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CreditCard className="text-primary" /> Payment Method
              </h2>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ flex: 1, border: '2px solid var(--color-primary)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center', backgroundColor: '#FFFDF5', cursor: 'pointer' }}>
                  <CreditCard size={24} style={{ margin: '0 auto 0.5rem auto' }} className="text-primary" />
                  <div style={{ fontWeight: 600 }}>Credit Card</div>
                </div>
                <div style={{ flex: 1, border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.25rem', color: '#003087', letterSpacing: '-1px' }}>PayPal</div>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                 <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Card Number</label>
                 <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="0000 0000 0000 0000" style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '1.125rem' }} />
                    <CreditCard size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                 </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', outline: 'none', fontFamily: 'var(--font-body)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>CVC</label>
                  <input type="text" placeholder="123" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', outline: 'none', fontFamily: 'var(--font-body)' }} />
                </div>
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                 <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Name on Card</label>
                 <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', outline: 'none', fontFamily: 'var(--font-body)' }} />
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Total Amount to Pay</div>
                    <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-secondary)' }}>$1,918.00</div>
                 </div>
                 <ShieldCheck size={32} className="text-accent" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="btn" style={{ padding: '0.5rem 1rem', color: 'var(--color-text-muted)' }} onClick={prevStep}>
                  <ArrowLeft size={18} /> Back
                </button>
                <button className="btn btn-accent" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }} onClick={nextStep}>
                  Confirm & Pay <CheckCircle size={18} style={{ marginLeft: '0.5rem' }} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success Message */}
          {step === 4 && (
            <div className="step-4 fade-in" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto', color: 'var(--color-accent)', border: '4px solid #fff', boxShadow: '0 0 0 4px var(--color-accent-light)' }}>
                 <CheckCircle size={48} />
              </div>
              
              <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-secondary)' }}>Booking Confirmed!</h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                Pack your bags! Your reservation for the Himalayan Adventure Trail has been successfully processed. An email receipt and itinerary have been sent to <strong>john@example.com</strong>.
              </p>

              <div style={{ backgroundColor: '#F8FAFC', padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '3rem', maxWidth: '400px', margin: '0 auto 3rem auto', textAlign: 'left' }}>
                 <div style={{ marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Booking Reference</div>
                    <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-secondary)' }}>AMZ-998274-HK</div>
                 </div>
                 <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Dates</div>
                    <div style={{ fontWeight: 600 }}>May 15 - May 19, 2026</div>
                 </div>
                 <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Travelers</div>
                    <div style={{ fontWeight: 600 }}>2 Adults</div>
                 </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <Link to="/" className="btn btn-outline" style={{ padding: '0.75rem 2rem' }}>
                  Return to Home
                </Link>
                <button className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                  Manage Booking
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
