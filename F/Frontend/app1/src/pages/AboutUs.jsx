import React, { useState } from 'react';

function AboutUs() {

  const [isOpen, setIsOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  return (
    <div className="container py-5 mt-3">
      <div className="row">

        {/* LEFT SECTION */}
        <div className="col-lg-8 pe-lg-5">

          <h3
            className="fw-bold mb-4 text-uppercase"
            style={{ color: '#444', borderBottom: '1px dotted #ccc', paddingBottom: '10px' }}
          >
            ABOUT SUNBEAM
          </h3>

          {/* Main Image */}
          <div className="mb-4 text-center">
            <img
              src="/images/sunbeam.png"
              alt="Sunbeam Building"
              className="img-fluid rounded shadow-sm border"
              style={{
                width: '100%',
                maxWidth: '650px',
                maxHeight: '350px',
                objectFit: 'cover',
                border: '5px solid #fff'
              }}
            />
          </div>

          {/* About Text */}
          <div
            className="about-text"
            style={{ textAlign: 'justify', color: '#555', fontSize: '15px', lineHeight: '1.8' }}
          >
            <p>At Sunbeam we believe retaining a competitive edge is imperative for any individual in today's professional world. 
              Companies are restructuring their organizations & reengineering their business processes. Not only have the challenges 
              become more demanding, but also the rewards of staying at the forefront seem to be promising..
            </p>
            
            <p>n this scenario, technical & personal skills which provide effective solutions & time critical support are of principal 
              significance for the long term growth of professionals. Sunbeam's expertise in effectively delivering training, solutions 
              & services has made it a favored institution to many students & professionals focused on an aggressive career growth strategy.
            </p>

            <p>Sunbeam's proven track record in bringing about effective transformations in individuals is backed by a solid understanding 
              of the rapidly changing needs of the industry & the global business scenario. Sunbeam's success has been built on its 
              comprehensively researched, innovative training methodologies, deployment of technology and an emphasis on transformational & 
              industry-relevant programs offering value-added services to its clients. A young and dynamic management team and carefully recruited 
              and trained staff members drive Sunbeam's business vision & have established strong credentials in a short span of time.
            </p>            
              
            <p>Sunbeam Group's expertise in effectively delivering training & solutions has made it a favored associate to many establishments 
                focused on aggressive growth strategies. Since it's humble beginnings in the late 90's Sunbeam Group has today, evolved into a 
                multi-technology, multi-location competency center with IT professionals capable of delivering high-end technological training 
                & solutions in diverse modes. Their expertise in various IT fields has made Sunbeam Group a premium turnkey solution provider.
            </p>

            
          </div>

          {/*TAB1 :SUNBEAM CAMPUS*/}
          <div className="mt-4 border rounded shadow-sm overflow-hidden bg-white">
            <div
              className="p-3 d-flex justify-content-between align-items-center"
              style={{ cursor: 'pointer', color: 'rgb(0, 43, 73)', borderLeft: '4px solid rgb(0, 43, 73)' }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="fw-bold">
                SunBeam Institute of Information Technology, Hinjawadi, Pune
              </span>
              <span className="fw-bold fs-4">{isOpen ? '−' : '+'}</span>
            </div>

            {isOpen && (
              <div className="p-4 border-top animate__animated animate__fadeIn" style={{ fontSize: '14px', color: '#555' }}>

                <div className="row mb-4 align-items-center">
                  <div className="col-md-4">
                    <img src="/images/sunbeam.png" alt="Campus" className="img-fluid rounded shadow-sm border" />
                  </div>
                  <div className="col-md-8">
                    <p className="mb-0">
                      SunBeam IT Park, Hinjawadi campus is located in Phase 2 of Rajiv Gandhi IT Park,
                      opposite Infosys Phase 2 campus. The institute spans 70,000 sq ft.
                    </p>
                  </div>
                </div>

                <div className="row mb-4 align-items-center flex-row-reverse">
                  <div className="col-md-4">
                    <img src="/images/sun2.png" alt="Classroom" className="img-fluid rounded shadow-sm border" />
                  </div>
                  <div className="col-md-8">
                    <p className="mb-0">
                      The campus houses world-class classrooms with ergonomic seating,
                      air-conditioning, LCD projectors and modern interiors.
                    </p>
                  </div>
                </div>

                <div className="row mb-4 align-items-center">
                  <div className="col-md-4">
                    <img src="/images/classroom.png" alt="Labs" className="img-fluid rounded shadow-sm border" />
                  </div>
                  <div className="col-md-8">
                    <p className="mb-0">
                      State-of-the-art labs enable students to spend extended hours on practicals
                      with concurrent lectures and hands-on sessions.
                    </p>
                  </div>
                </div>

                <div className="row align-items-center flex-row-reverse">
                  <div className="col-md-4">
                    <img src="/images/sun4.png" alt="Reception" className="img-fluid rounded shadow-sm border" />
                  </div>
                  <div className="col-md-8">
                    <p className="mb-0">
                      The campus also includes a library, reading rooms, admin blocks,
                      canteen and nearby hostel assistance.
                    </p>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* TAB 2:LOCATION (SEPARATE)*/}
          <div className="mt-3 border rounded shadow-sm overflow-hidden bg-white">
            <div
              className="p-3 d-flex justify-content-between align-items-center"
              style={{ cursor: 'pointer', color: 'rgb(0, 43, 73)', borderLeft: '4px solid rgb(0, 43, 73)' }}
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              <span className="fw-bold">Location</span>
              <span className="fw-bold fs-4">{isLocationOpen ? '−' : '+'}</span>
            </div>

            {isLocationOpen && (
              <div className="p-4 border-top animate__animated animate__fadeIn">
                <p style={{ fontSize: '14px', color: '#555' }}>
                  <strong>SunBeam Institute of Information Technology</strong><br />
                  SunBeam IT Park, Phase 2,<br />
                  Rajiv Gandhi Infotech Park,<br />
                  Hinjawadi, Pune – 411057
                </p>

                <div className="ratio ratio-16x9 rounded shadow-sm border mb-3">
                  <iframe
                    src="https://www.google.com/maps?q=SunBeam+Institute+of+Information+Technology+Hinjawadi+Pune&output=embed"
                    title="SunBeam Location"
                    loading="lazy"
                    style={{ border: 0 }}
                  ></iframe>
                </div>

                <div className="text-end">
                  <a
                    href="https://www.google.com/maps?q=SunBeam+Institute+of+Information+Technology+Hinjawadi+Pune"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm rounded-pill px-3"
                  >
                    ~Get Directions
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT SECTION */}
      <div className="col-lg-4 mt-5 mt-lg-0">
        <div
          className="card text-center text-white border-0 shadow"
          style={{
            background: 'linear-gradient(to bottom, #4eb8d1, #3a97ae)',
            minHeight: '520px'
          }}
        >
          <div className="card-body d-flex flex-column align-items-center justify-content-center">
           
            <h4 className="fw-bold mb-4">
              Online Addmission<br/> & <br/>Registration
            </h4>

            <button
              className="btn rounded-pill px-4 fw-bold mb-5"
              style={{
                backgroundColor: 'rgb(0, 43, 73)',
                color: '#fff'
              }}
            >Register Now
            </button>

              <img
                src="/images/college_stud.webp"
                alt="Registration"
                className="img-fluid mb-4"
                style={{ maxWidth: '400px', borderRadius: '10%' }}
              />

          </div>
        </div>
      </div>


      </div>
    </div>
  );
}

export default AboutUs;
