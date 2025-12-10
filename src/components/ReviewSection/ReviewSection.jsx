import React, { useEffect, useRef, useState } from "react";

const ReviewSection = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);
  const cardRef3 = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const scrollDistance = 1000; // Scroll distance while pinned (in pixels)

  useEffect(() => {
    let rafId = null;
    let ticking = false;

    const updateProgress = () => {
      if (!wrapperRef.current) return;

      const wrapper = wrapperRef.current;
      const scrollY = window.scrollY;

      // Get wrapper's position in document
      const wrapperTop = wrapper.offsetTop;
      const pinStart = wrapperTop;
      const pinEnd = wrapperTop + scrollDistance;

      if (scrollY >= pinStart && scrollY < pinEnd) {
        // Section should be pinned
        setIsPinned(true);

        // Calculate scroll progress based on scroll distance while pinned
        const scrollProg = scrollY - pinStart;
        const progress = (scrollProg / scrollDistance) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      } else if (scrollY >= pinEnd) {
        // Scrolled past - unpin and keep at 100%
        setIsPinned(false);
        setScrollProgress(100);
      } else {
        // Before pin start
        setIsPinned(false);
        setScrollProgress(0);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Calculate card positions based on scroll progress
  const leftCardX = -(scrollProgress / 100) * 40; // 0 to -40vw
  const rightCardX = (scrollProgress / 100) * 40; // 0 to 40vw

  return (
    <div
      ref={wrapperRef}
      style={{
        height: `calc(100vh + ${scrollDistance}px)`,
        position: 'relative'
      }}
    >
      <section
        ref={sectionRef}
        style={{
          height: "100vh",
          position: isPinned ? 'fixed' : scrollProgress === 100 ? 'absolute' : 'relative',
          top: isPinned ? 0 : scrollProgress === 100 ? 'auto' : 'auto',
          bottom: scrollProgress === 100 ? 0 : 'auto',
          left: isPinned || scrollProgress === 100 ? 0 : 'auto',
          right: isPinned || scrollProgress === 100 ? 0 : 'auto',
          overflow: "hidden",
          background: "#f7f6f1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      {/* Card Container */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>

        {/* Left Card - Beige with Rotation */}
        <div
          ref={cardRef1}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) translateX(${leftCardX}vw)`,
            height: "400px",
            width: "420px",
            background: "#ddd8cc",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            padding: "50px 45px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "30px",
            }}>
              <span style={{
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#333",
                fontWeight: "400",
              }}>
                TWO
              </span>
              <span style={{
                fontSize: "20px",
                color: "#333",
              }}>
                ★
              </span>
            </div>

            <p style={{
              fontSize: "18px",
              lineHeight: "1.6",
              color: "#333",
              fontFamily: "Georgia, serif",
              marginBottom: "0",
              transform: "rotate(0deg)",
            }}>
              Lorem ipsum dolor sit amet consectetur. Nulla donec aliquam morbi dolor adipiscing. Maecenas elit consequat in elementum sed sapien diam. Ligula lorem sem et maecenas rutrum.
            </p>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}>
            <div>
              <div style={{
                fontSize: "10px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#666",
                marginBottom: "4px",
              }}>
                CUSTOMER:
              </div>
              <div style={{
                fontSize: "12px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#333",
              }}>
                JOHN DOE
              </div>
            </div>
            <span style={{ fontSize: "20px", color: "#333" }}>★</span>
          </div>
        </div>

        {/* Center Card - White, Main Focus */}
        <div
          ref={cardRef2}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "400px",
            width: "420px",
            background: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
            padding: "50px 50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 2,
          }}
        >
          <div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "30px",
            }}>
              <span style={{
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#333",
                fontWeight: "400",
              }}>
                ONE
              </span>
              <span style={{
                fontSize: "20px",
                color: "#333",
              }}>
                ★
              </span>
            </div>

            <div style={{
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#999",
              marginBottom: "25px",
            }}>
              REVIEW 01
            </div>

            <p style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "#333",
              fontFamily: "Georgia, serif",
              marginBottom: "0",
            }}>
              Lorem ipsum dolor sit amet consectetur. Nulla donec aliquam morbi dolor adipiscing. Maecenas elit consequat in elementum sed sapien diam. Ligula lorem sem et maecenas rutrum.
            </p>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}>
            <div>
              <div style={{
                fontSize: "10px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#666",
                marginBottom: "4px",
              }}>
                CUSTOMER:
              </div>
              <div style={{
                fontSize: "12px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#333",
              }}>
                JOHN DOE
              </div>
            </div>
            <span style={{ fontSize: "20px", color: "#333" }}>★</span>
          </div>
        </div>

        {/* Right Card - Beige with Rotation */}
        <div
          ref={cardRef3}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) translateX(${rightCardX}vw)`,
            height: "400px",
            width: "420px",
            background: "#ddd8cc",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            padding: "50px 45px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "30px",
            }}>
              <span style={{
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#333",
                fontWeight: "400",
              }}>
                THREE
              </span>
              <span style={{
                fontSize: "20px",
                color: "#333",
              }}>
                ★
              </span>
            </div>

            <p style={{
              fontSize: "18px",
              lineHeight: "1.6",
              color: "#333",
              fontFamily: "Georgia, serif",
              marginBottom: "0",
            }}>
              Lorem ipsum dolor sit amet consectetur. Nulla donec aliquam morbi dolor adipiscing. Maecenas elit consequat in elementum sed sapien diam. Ligula lorem sem et maecenas rutrum.
            </p>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}>
            <div>
              <div style={{
                fontSize: "10px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#666",
                marginBottom: "4px",
              }}>
                CUSTOMER:
              </div>
              <div style={{
                fontSize: "12px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#333",
              }}>
                JOHN DOE
              </div>
            </div>
            <span style={{ fontSize: "20px", color: "#333" }}>★</span>
          </div>
        </div>

      </div>
    </section>
    </div>
  );
};

export default ReviewSection;
